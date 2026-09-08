import db from '../data/database.js';

export const triggerSOS = (req, res) => {
  const { location } = req.body;
  if (!location) {
    return res.status(400).json({ message: 'Location is required to trigger SOS' });
  }

  const id = Date.now().toString();
  const user = db.prepare('SELECT name FROM users WHERE id = ?').get(req.user.id);
  const locationStr = typeof location === 'string' ? location : JSON.stringify(location);

  db.prepare(`
    INSERT INTO sos_alerts (id, userId, userName, location, status, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, req.user.id, user?.name, locationStr, 'active', new Date().toISOString());

  console.log(`[EMERGENCY SERVICES ALERT] SOS triggered by User ID: ${req.user.id} at Location: ${locationStr}`);

  res.status(201).json({ message: 'SOS triggered successfully, emergency services alerted', alertId: id });
};

export const getSOSAlerts = (req, res) => {
  let alerts;
  if (req.user.role === 'admin') {
    alerts = db.prepare('SELECT * FROM sos_alerts').all();
  } else {
    alerts = db.prepare('SELECT * FROM sos_alerts WHERE userId = ?').all(req.user.id);
  }
  
  // Parse location JSON string back to object if possible
  const formattedAlerts = alerts.map(a => {
    try {
      return { ...a, location: JSON.parse(a.location) };
    } catch(e) {
      return a;
    }
  });

  res.json(formattedAlerts);
};

export const resolveSOS = (req, res) => {
  const { alertId } = req.params;
  const alert = db.prepare('SELECT * FROM sos_alerts WHERE id = ?').get(alertId);

  if (!alert) return res.status(404).json({ message: 'SOS alert not found' });

  db.prepare("UPDATE sos_alerts SET status = 'resolved', resolvedAt = ? WHERE id = ?").run(new Date().toISOString(), alertId);
  const updated = db.prepare('SELECT * FROM sos_alerts WHERE id = ?').get(alertId);

  res.json({ message: 'SOS alert resolved', alert: updated });
};
