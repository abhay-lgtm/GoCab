import db from '../data/database.js';

export const updateLocation = (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  db.prepare(`
    INSERT OR REPLACE INTO locations (userId, lat, lng, timestamp)
    VALUES (?, ?, ?, ?)
  `).run(req.user.id, lat, lng, new Date().toISOString());

  res.json({ message: 'Location updated successfully' });
};

export const getLocation = (req, res) => {
  const { userId } = req.params;
  const userLocation = db.prepare('SELECT * FROM locations WHERE userId = ?').get(userId);

  if (!userLocation) {
    return res.status(404).json({ message: 'Location not found for this user' });
  }

  res.json(userLocation);
};

export const getShareableLink = (req, res) => {
  const link = `http://localhost:5000/api/location/share/${req.user.id}`;
  res.json({ message: 'Share this link to track live location', link });
};
