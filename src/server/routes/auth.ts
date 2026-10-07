import express from 'express';
import bcrypt from 'bcryptjs';
import { authenticateToken, generateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// In production, these should be in environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'haileabgashaw386@gmail.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$YourHashedPasswordHere';

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In production, use bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    // For now, simple comparison (CHANGE IN PRODUCTION)
    const isValid = password === '447490'; // Default password - CHANGE THIS

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(email);
    res.json({ token, user: { email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify token
router.get('/verify', authenticateToken, (req: AuthRequest, res) => {
  res.json({ valid: true, user: req.user });
});

// Logout (client-side token removal)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ success: true });
});

export default router;
