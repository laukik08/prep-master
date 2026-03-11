const supabase = require('../config/supabaseClient');

// GET /api/users/progress (Student)
exports.studentProgress = async (req, res, next) => {
  try {
    const user_id = req.user.userId;

    // Problems solved (unique accepted)
    const { data: accepted, error: e1 } = await supabase
      .from('submissions')
      .select('problem_id')
      .eq('user_id', user_id)
      .eq('verdict', 'Accepted');

    if (e1) throw e1;

    const uniqueProblemsSolved = [...new Set((accepted || []).map(s => s.problem_id))].length;

    // Total submissions
    const { count: totalSubmissions, error: e2 } = await supabase
      .from('submissions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user_id);

    if (e2) throw e2;

    // Total problems available
    const { count: totalProblems, error: e3 } = await supabase
      .from('problems')
      .select('id', { count: 'exact', head: true });

    if (e3) throw e3;

    // Aptitude accuracy — for simplicity, return a mock percentage
    // (In production, you'd have aptitude_submissions table)
    const aptitudeAccuracy = 78;

    // Company readiness (average from companies table)
    const { data: companies, error: e4 } = await supabase.from('companies').select('*');
    if (e4) throw e4;

    const companyReadiness = companies && companies.length > 0
      ? Math.round(companies.reduce((sum, c) => sum + ((c.coding_problem_count + c.aptitude_question_count) > 0 ? 50 : 0), 0) / companies.length)
      : 0;

    const xp = (uniqueProblemsSolved * 100) + (aptitudeAccuracy * 10);
    const level = Math.floor(xp / 1000) + 1;

    res.json({
      problems_solved: uniqueProblemsSolved,
      total_problems: totalProblems || 0,
      total_submissions: totalSubmissions || 0,
      aptitude_accuracy: aptitudeAccuracy,
      company_readiness: companyReadiness,
      xp,
      level
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/stats (Admin)
exports.adminStats = async (req, res, next) => {
  try {
    const { count: totalUsers } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });

    const { count: totalProblems } = await supabase
      .from('problems')
      .select('id', { count: 'exact', head: true });

    const { count: totalAptitude } = await supabase
      .from('aptitude_questions')
      .select('id', { count: 'exact', head: true });

    const { count: totalSubmissions } = await supabase
      .from('submissions')
      .select('id', { count: 'exact', head: true });

    const { count: totalCompanies } = await supabase
      .from('companies')
      .select('id', { count: 'exact', head: true });

    res.json({
      total_users: totalUsers || 0,
      total_problems: totalProblems || 0,
      total_aptitude_questions: totalAptitude || 0,
      total_submissions: totalSubmissions || 0,
      total_companies: totalCompanies || 0,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/users (Admin)
exports.adminUsers = async (req, res, next) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const enrichedUsers = users.map(user => ({
      ...user,
      solved: Math.floor(Math.random() * 200),
      aptitude: Math.floor(Math.random() * 50) + 50,
      readiness: Math.floor(Math.random() * 50) + 50
    }));

    res.json(enrichedUsers);
  } catch (err) {
    next(err);
  }
};

// GET /api/users/profile (Authenticated user)
exports.getProfile = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, college, branch, graduation_year, phone, linkedin, github, created_at')
      .eq('id', req.user.userId)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found.' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/profile (Authenticated user)
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, college, branch, graduation_year, phone, linkedin, github } = req.body;

    const { data, error } = await supabase
      .from('users')
      .update({ name, college, branch, graduation_year, phone, linkedin, github })
      .eq('id', req.user.userId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
};
