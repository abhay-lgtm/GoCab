import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../data/database.js';

const SECRET = process.env.JWT_SECRET || 'secret-key';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = Date.now().toString();

  db.prepare('INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)').run(
    id, name, email, hashedPassword, role
  );

  res.status(201).json({ message: 'User registered successfully', userId: id });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  let isValid = false;
  if (user.password) {
    isValid = await bcrypt.compare(password, user.password);
  } else {
    // Fallback for mock users without password hash initially, just in case
    if ((user.role === 'admin' && password === 'admin123') || password === 'password123') {
      isValid = true;
    }
  }

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '24h' });
  res.json({ token, role: user.role, userId: user.id, name: user.name });
};
