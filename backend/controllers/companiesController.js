const supabase = require('../config/supabaseClient');

// GET /api/companies
exports.getAll = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// POST /api/companies (Admin)
exports.create = async (req, res, next) => {
  try {
    const { name, industry, description, logo_url, aptitude_question_count, coding_problem_count } = req.body;

    const { data, error } = await supabase
      .from('companies')
      .insert({ name, industry, description, logo_url, aptitude_question_count, coding_problem_count })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// PUT /api/companies/:id (Admin)
exports.update = async (req, res, next) => {
  try {
    const { name, industry, description, logo_url, aptitude_question_count, coding_problem_count } = req.body;

    const { data, error } = await supabase
      .from('companies')
      .update({ name, industry, description, logo_url, aptitude_question_count, coding_problem_count })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Company not found.' });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/companies/:id (Admin)
exports.remove = async (req, res, next) => {
  try {
    const { error } = await supabase.from('companies').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Company deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
