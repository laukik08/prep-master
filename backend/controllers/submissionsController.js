const supabase = require('../config/supabaseClient');

// POST /api/submissions
exports.create = async (req, res, next) => {
  try {
    const { problem_id, language, code, verdict, execution_time } = req.body;
    const user_id = req.user.userId;

    const { data, error } = await supabase
      .from('submissions')
      .insert({ user_id, problem_id, language, code, verdict, execution_time })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// GET /api/submissions (user's own submissions)
exports.getMySubmissions = async (req, res, next) => {
  try {
    const user_id = req.user.userId;

    const { data, error } = await supabase
      .from('submissions')
      .select('*, problems(title, difficulty)')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
};
