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
  const { name, phone, safeRideEnabled } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const updatedName = name !== undefined ? name : user.name;
  const updatedPhone = phone !== undefined ? phone : user.phone;
  const updatedSafeRide = safeRideEnabled !== undefined ? (safeRideEnabled ? 1 : 0) : (user.safeRideEnabled !== undefined ? user.safeRideEnabled : 1);
  
  db.prepare('UPDATE users SET name = ?, phone = ?, safeRideEnabled = ? WHERE id = ?').run(updatedName, updatedPhone, updatedSafeRide, req.user.id);
  
  const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  const { password, ...userProfile } = updatedUser;
  
  res.json({ message: 'Profile updated', user: userProfile });
};
