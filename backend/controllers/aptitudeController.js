const supabase = require('../config/supabaseClient');

// GET /api/aptitude
exports.getAll = async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;
    let query = supabase.from('aptitude_questions').select('*').order('created_at', { ascending: false });

    if (category) query = query.eq('category', category);
    if (difficulty) query = query.eq('difficulty', difficulty);

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// POST /api/aptitude (Admin)
exports.create = async (req, res, next) => {
  try {
    const { question, options, correct_answer, category, difficulty, companies } = req.body;

    const { data, error } = await supabase
      .from('aptitude_questions')
      .insert({ question, options, correct_answer, category, difficulty, companies })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// PUT /api/aptitude/:id (Admin)
exports.update = async (req, res, next) => {
  try {
    const { question, options, correct_answer, category, difficulty, companies } = req.body;

    const { data, error } = await supabase
      .from('aptitude_questions')
      .update({ question, options, correct_answer, category, difficulty, companies })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Question not found.' });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/aptitude/:id (Admin)
exports.remove = async (req, res, next) => {
  try {
    const { error } = await supabase.from('aptitude_questions').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Aptitude question deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/aptitude/bulk (Admin)
exports.bulkImport = async (req, res, next) => {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Provide a non-empty array of questions.' });
    }

    const { data, error } = await supabase.from('aptitude_questions').insert(questions).select();
    if (error) throw error;

    res.status(201).json({ message: `${data.length} questions imported.`, data });
  } catch (err) {
    next(err);
  }
};
