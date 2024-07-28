const Project = require('../models/Project');
const { createOne, readAll, readById, updateById, deleteById } = require('../utils/functions');

exports.createProject = async (req, res) => {
  try {
    const project = await createOne(Project, req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await readAll(Project);
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await readById(Project, req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProjectById = async (req, res) => {
  try {
    const project = await updateById(Project, req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProjectById = async (req, res) => {
  try {
    const project = await deleteById(Project, req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
