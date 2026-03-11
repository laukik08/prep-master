const supabase = require('../config/supabaseClient');

// GET /api/problems
exports.getAll = async (req, res, next) => {
  try {
    const { difficulty, topic, company } = req.query;
    let query = supabase.from('problems').select('*').order('created_at', { ascending: false });

    if (difficulty) query = query.eq('difficulty', difficulty);
    if (topic) query = query.contains('topics', [topic]);
    if (company) query = query.contains('companies', [company]);

    const { data: problemsAuth, error } = await query;
    if (error) throw error;

    let problems = problemsAuth;

    // Attach "Solved" status if user is logged in
    if (req.user && req.user.role === 'student') {
      const { data: submissions, error: subError } = await supabase
        .from('submissions')
        .select('problem_id')
        .eq('user_id', req.user.userId)
        .eq('verdict', 'Accepted');

      if (!subError && submissions) {
        const solvedIds = new Set(submissions.map(s => s.problem_id));
        problems = problems.map(p => ({
          ...p,
          status: solvedIds.has(p.id) ? 'Solved' : 'Unsolved'
        }));
      }
    }

    res.json(problems);
  } catch (err) {
    next(err);
  }
};

// GET /api/problems/:id
exports.getById = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Problem not found.' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// POST /api/problems (Admin)
exports.create = async (req, res, next) => {
  try {
    const { title, description, difficulty, topics, companies, constraints, example_input, example_output } = req.body;

    const { data, error } = await supabase
      .from('problems')
      .insert({ title, description, difficulty, topics, companies, constraints, example_input, example_output })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// PUT /api/problems/:id (Admin)
exports.update = async (req, res, next) => {
  try {
    const { title, description, difficulty, topics, companies, constraints, example_input, example_output } = req.body;

    const { data, error } = await supabase
      .from('problems')
      .update({ title, description, difficulty, topics, companies, constraints, example_input, example_output })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Problem not found.' });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/problems/:id (Admin)
exports.remove = async (req, res, next) => {
  try {
    const { error } = await supabase.from('problems').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Problem deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/problems/bulk (Admin)
exports.bulkImport = async (req, res, next) => {
  try {
    const { problems } = req.body;

    if (!Array.isArray(problems) || problems.length === 0) {
      return res.status(400).json({ error: 'Provide a non-empty array of problems.' });
    }

    const { data, error } = await supabase.from('problems').insert(problems).select();
    if (error) throw error;

    res.status(201).json({ message: `${data.length} problems imported.`, data });
  } catch (err) {
    next(err);
  }
};
