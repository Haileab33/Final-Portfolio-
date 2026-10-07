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

// Settings
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const data = await readJsonFile('settings.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read settings' });
  }
});

router.put('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await writeJsonFile('settings.json', req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

export default router;
