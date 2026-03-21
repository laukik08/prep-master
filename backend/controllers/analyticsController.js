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

    const acceptedProblemIds = new Set((accepted || []).map(s => s.problem_id));
    const uniqueProblemsSolved = acceptedProblemIds.size;

    // Total submissions
    const { count: totalSubmissions, error: e2 } = await supabase
      .from('submissions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user_id);

    if (e2) throw e2;

    // All problems to calculate topic stats
    const { data: allProblems, error: e3 } = await supabase
      .from('problems')
      .select('id, topics');

    if (e3) throw e3;

    const totalProblems = allProblems.length;

    // Calculate topic mastery
    const topicStatsMap = {};
    allProblems.forEach(p => {
      const pTopics = p.topics || [];
      const isSolved = acceptedProblemIds.has(p.id);
      pTopics.forEach(t => {
        if (!topicStatsMap[t]) {
          topicStatsMap[t] = { topic: t, total: 0, solved: 0 };
        }
        topicStatsMap[t].total += 1;
        if (isSolved) topicStatsMap[t].solved += 1;
      });
    });

    const topic_stats = Object.values(topicStatsMap);

    // Real Aptitude accuracy from aptitude_submissions
    const { data: aptitudeSubs } = await supabase
      .from('aptitude_submissions')
      .select('is_correct')
      .eq('user_id', user_id);
    
    let aptitudeAccuracy = 0;
    if (aptitudeSubs && aptitudeSubs.length > 0) {
      const correct = aptitudeSubs.filter(s => s.is_correct).length;
      aptitudeAccuracy = Math.round((correct / aptitudeSubs.length) * 100);
    }

    // Company readiness (calculated based on coding progress and aptitude accuracy)
    const codingProgress = totalProblems > 0 ? (uniqueProblemsSolved / totalProblems) * 100 : 0;
    const companyReadiness = Math.round((codingProgress * 0.6) + (aptitudeAccuracy * 0.4));

    const xp = (uniqueProblemsSolved * 100) + (aptitudeAccuracy * 10);
    const level = Math.floor(xp / 1000) + 1;

    res.json({
      problems_solved: uniqueProblemsSolved,
      total_problems: totalProblems || 0,
      total_submissions: totalSubmissions || 0,
      aptitude_accuracy: aptitudeAccuracy,
      company_readiness: companyReadiness,
      topic_stats,
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

    // Fetch all submissions to compute per-student stats
    const { data: allSubmissions } = await supabase
      .from('submissions')
      .select('user_id, problem_id, verdict');

    const { data: allAptitude } = await supabase
      .from('aptitude_submissions')
      .select('user_id, is_correct');

    // Get total problems count for readiness calculation
    const { count: totalProblemsCount } = await supabase
      .from('problems')
      .select('id', { count: 'exact', head: true });

    const enrichedUsers = users.map(user => {
      const userSubs = (allSubmissions || []).filter(s => s.user_id === user.id);
      const acceptedProblems = [...new Set(userSubs.filter(s => s.verdict === 'Accepted').map(s => s.problem_id))];
      
      const userAptitude = (allAptitude || []).filter(a => a.user_id === user.id);
      const aptitudeAccuracy = userAptitude.length > 0
        ? Math.round((userAptitude.filter(a => a.is_correct).length / userAptitude.length) * 100)
        : 0;

      // Readiness = weighted: 50% coding progress + 50% aptitude accuracy
      const codingProgress = totalProblemsCount > 0 
        ? Math.round((acceptedProblems.length / totalProblemsCount) * 100) 
        : 0;
      const readiness = Math.round(codingProgress * 0.5 + aptitudeAccuracy * 0.5);

      return {
        ...user,
        solved: acceptedProblems.length,
        aptitude: aptitudeAccuracy,
        readiness: Math.min(readiness, 100),
        total_submissions: userSubs.length,
        aptitude_total: userAptitude.length,
        aptitude_correct: userAptitude.filter(a => a.is_correct).length,
      };
    });

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
