import { Domain, Competency, Skill, Topic, Role } from '../models/CompetencyModels.js';
import { AuditLog } from '../models/SystemModels.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// ─── DOMAINS ─────────────────────────────────────────────────────────────────
export const getDomains = asyncHandler(async (req, res) => {
  const domains = await Domain.find({ status: 'ACTIVE' }).sort({ name: 1 });
  res.json({ success: true, data: domains });
});

export const createDomain = asyncHandler(async (req, res) => {
  const domain = await Domain.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: domain });
});

export const updateDomain = asyncHandler(async (req, res) => {
  const domain = await Domain.findByIdAndUpdate(req.params.id, { ...req.body, updatedBy: req.user._id }, { new: true });
  if (!domain) return res.status(404).json({ success: false, message: 'Domain not found.' });
  res.json({ success: true, data: domain });
});

export const deleteDomain = asyncHandler(async (req, res) => {
  await Domain.findByIdAndUpdate(req.params.id, { status: 'ARCHIVED' });
  res.json({ success: true, message: 'Domain archived.' });
});

// ─── COMPETENCIES ─────────────────────────────────────────────────────────────
export const getCompetencies = asyncHandler(async (req, res) => {
  const { domainId } = req.query;
  const query = { status: 'ACTIVE' };
  if (domainId) query.domain = domainId;
  const competencies = await Competency.find(query).populate('domain', 'name').sort({ name: 1 });
  res.json({ success: true, data: competencies });
});

export const createCompetency = asyncHandler(async (req, res) => {
  const competency = await Competency.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: competency });
});

export const updateCompetency = asyncHandler(async (req, res) => {
  const competency = await Competency.findByIdAndUpdate(req.params.id, { ...req.body, updatedBy: req.user._id }, { new: true });
  if (!competency) return res.status(404).json({ success: false, message: 'Competency not found.' });
  res.json({ success: true, data: competency });
});

// ─── SKILLS ───────────────────────────────────────────────────────────────────
export const getSkills = asyncHandler(async (req, res) => {
  const { competencyId, domainId } = req.query;
  const query = { status: 'ACTIVE' };
  if (competencyId) query.competency = competencyId;
  if (domainId) query.domain = domainId;
  const skills = await Skill.find(query).populate('competency', 'name').populate('domain', 'name').sort({ name: 1 });
  res.json({ success: true, data: skills });
});

export const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: skill });
});

export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, { ...req.body, updatedBy: req.user._id }, { new: true });
  if (!skill) return res.status(404).json({ success: false, message: 'Skill not found.' });
  res.json({ success: true, data: skill });
});

// ─── TOPICS ───────────────────────────────────────────────────────────────────
export const getTopics = asyncHandler(async (req, res) => {
  const { skillId } = req.query;
  const query = { status: 'ACTIVE' };
  if (skillId) query.skill = skillId;
  const topics = await Topic.find(query).populate('skill', 'name').sort({ order: 1, name: 1 });
  res.json({ success: true, data: topics });
});

export const createTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.create(req.body);
  res.status(201).json({ success: true, data: topic });
});

// ─── ROLES ────────────────────────────────────────────────────────────────────
export const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find({ status: 'ACTIVE' })
    .populate('requiredCompetencies.competency', 'name')
    .populate('requiredSkills.skill', 'name')
    .sort({ name: 1 });
  res.json({ success: true, data: roles });
});

export const createRole = asyncHandler(async (req, res) => {
  const role = await Role.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: role });
});

export const updateRole = asyncHandler(async (req, res) => {
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!role) return res.status(404).json({ success: false, message: 'Role not found.' });
  res.json({ success: true, data: role });
});

// ─── FULL FRAMEWORK TREE ──────────────────────────────────────────────────────
export const getFrameworkTree = asyncHandler(async (req, res) => {
  const [domains, competencies, skills] = await Promise.all([
    Domain.find({ status: 'ACTIVE' }).lean(),
    Competency.find({ status: 'ACTIVE' }).lean(),
    Skill.find({ status: 'ACTIVE' }).lean(),
  ]);

  const tree = domains.map(domain => ({
    ...domain,
    competencies: competencies
      .filter(c => c.domain?.toString() === domain._id.toString())
      .map(comp => ({
        ...comp,
        skills: skills.filter(s => s.competency?.toString() === comp._id.toString()),
      })),
  }));

  res.json({ success: true, data: tree });
});
