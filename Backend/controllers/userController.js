import db from '../data/database.js';

export const getMe = (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Exclude password
  const { password, ...userProfile } = user;
  res.json(userProfile);
};

export const updateMe = (req, res) => {
  const { name, phone } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const updatedName = name || user.name;
  const updatedPhone = phone || user.phone;
  
  db.prepare('UPDATE users SET name = ?, phone = ? WHERE id = ?').run(updatedName, updatedPhone, req.user.id);
  
  const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  const { password, ...userProfile } = updatedUser;
  
  res.json({ message: 'Profile updated', user: userProfile });
};
