const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Helper: Generate the OAuth redirect URI dynamically
const getRedirectUri = (req, provider) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.get('host');
  return `${protocol}://${host}/api/auth/oauth/${provider}/callback`;
};

// ─── Google OAuth ────────────────────────────────────
exports.googleRedirect = (req, res) => {
  if (!GOOGLE_CLIENT_ID) {
    return res.redirect(`${FRONTEND_URL}/login?error=Google OAuth not configured. Add GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET in .env`);
  }
  const redirectUri = getRedirectUri(req, 'google');
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) throw new Error('No authorization code received.');

    const redirectUri = getRedirectUri(req, 'google');

    // Exchange code for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) throw new Error('Failed to get access token from Google.');

    // Get user info
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await userRes.json();

    // Find or create user
    const user = await findOrCreateOAuthUser({
      email: googleUser.email,
      name: googleUser.name,
      provider: 'google',
      provider_id: googleUser.id,
    });

    // Generate JWT and redirect
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.redirect(`${FRONTEND_URL}/login?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }))}`);
  } catch (err) {
    console.error('Google OAuth error:', err);
    res.redirect(`${FRONTEND_URL}/login?error=${encodeURIComponent(err.message || 'Google sign-in failed')}`);
  }
};

// ─── GitHub OAuth ────────────────────────────────────
exports.githubRedirect = (req, res) => {
  if (!GITHUB_CLIENT_ID) {
    return res.redirect(`${FRONTEND_URL}/login?error=GitHub OAuth not configured. Add GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET in .env`);
  }
  const redirectUri = getRedirectUri(req, 'github');
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'user:email',
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
};

exports.githubCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) throw new Error('No authorization code received.');

    const redirectUri = getRedirectUri(req, 'github');

    // Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      }),
    });
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) throw new Error('Failed to get access token from GitHub.');

    // Get user info
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'PrepMaster' },
    });
    const githubUser = await userRes.json();

    // Get email (may be private)
    let email = githubUser.email;
    if (!email) {
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'PrepMaster' },
      });
      const emails = await emailRes.json();
      const primary = emails.find(e => e.primary) || emails[0];
      email = primary?.email;
    }

    if (!email) throw new Error('Could not retrieve email from GitHub.');

    // Find or create user
    const user = await findOrCreateOAuthUser({
      email,
      name: githubUser.name || githubUser.login,
      provider: 'github',
      provider_id: String(githubUser.id),
    });

    // Generate JWT and redirect
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.redirect(`${FRONTEND_URL}/login?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }))}`);
  } catch (err) {
    console.error('GitHub OAuth error:', err);
    res.redirect(`${FRONTEND_URL}/login?error=${encodeURIComponent(err.message || 'GitHub sign-in failed')}`);
  }
};

// ─── Helper: Find or Create OAuth User ──────────────
async function findOrCreateOAuthUser({ email, name, provider, provider_id }) {
  // Check if user exists
  const { data: existing } = await supabase
    .from('users')
    .select('id, name, email, role')
    .eq('email', email)
    .single();

  if (existing) return existing;

  // Create new user (no password since it's OAuth)
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      name,
      email,
      password: `oauth_${provider}_${provider_id}`, // placeholder, not used for login
      role: 'student',
      oauth_provider: provider,
      oauth_provider_id: provider_id,
    })
    .select('id, name, email, role')
    .single();

  if (error) throw error;
  return newUser;
}
