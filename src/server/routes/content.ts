import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const DATA_DIR = path.join(__dirname, '../../data');

// Helper function to read JSON file
const readJsonFile = async (filename: string) => {
  const filePath = path.join(DATA_DIR, filename);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write JSON file
const writeJsonFile = async (filename: string, data: any) => {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Personal Info
router.get('/personal-info', async (req, res) => {
  try {
    const data = await readJsonFile('personal-info.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

router.put('/personal-info', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await writeJsonFile('personal-info.json', req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Skills
router.get('/skills', async (req, res) => {
  try {
    const data = await readJsonFile('skills.json');
    res.json({ skills: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

router.put('/skills', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await writeJsonFile('skills.json', req.body.skills);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Projects
router.get('/projects', async (req, res) => {
  try {
    const data = await readJsonFile('projects.json');
    res.json({ projects: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

router.post('/projects', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const projects = await readJsonFile('projects.json');
    const newProject = { ...req.body, id: Date.now().toString() };
    projects.push(newProject);
    await writeJsonFile('projects.json', projects);
    res.json({ success: true, id: newProject.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

router.put('/projects/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const projects = await readJsonFile('projects.json');
    const index = projects.findIndex((p: any) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    projects[index] = { ...projects[index], ...req.body };
    await writeJsonFile('projects.json', projects);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

router.delete('/projects/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const projects = await readJsonFile('projects.json');
    const filtered = projects.filter((p: any) => p.id !== req.params.id);
    await writeJsonFile('projects.json', filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

// Experience
router.get('/experience', async (req, res) => {
  try {
    const data = await readJsonFile('experience.json');
    res.json({ experience: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

router.put('/experience', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await writeJsonFile('experience.json', req.body.experience);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Education
router.get('/education', async (req, res) => {
  try {
    const data = await readJsonFile('education.json');
    res.json({ education: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

router.put('/education', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await writeJsonFile('education.json', req.body.education);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const data = await readJsonFile('testimonials.json');
    res.json({ testimonials: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

router.put('/testimonials', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await writeJsonFile('testimonials.json', req.body.testimonials);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Certifications
router.get('/certifications', async (req, res) => {
  try {
    const data = await readJsonFile('certifications.json');
    res.json({ certifications: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

router.put('/certifications', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await writeJsonFile('certifications.json', req.body.certifications);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

export default router;
