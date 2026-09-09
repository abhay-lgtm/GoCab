import db from '../data/database.js';

export const triggerSOS = (req, res) => {
  const { location, rideId: reqRideId } = req.body;
  if (!location) {
    return res.status(400).json({ message: 'Location is required to trigger SOS' });
  }

  const id = Date.now().toString();
  const user = db.prepare('SELECT name, phone FROM users WHERE id = ?').get(req.user.id);
  const locationStr = typeof location === 'string' ? location : JSON.stringify(location);

  // Associate with a ride if provided or find the active/latest ride
  let ride = null;
  if (reqRideId) {
    ride = db.prepare('SELECT * FROM bookings WHERE id = ?').get(reqRideId);
  }
  if (!ride) {
    ride = db.prepare(`
      SELECT * FROM bookings 
      WHERE (customerId = ? OR driverId = ?)
      ORDER BY 
        CASE 
          WHEN status = 'in_progress' THEN 1
          WHEN status = 'accepted' THEN 2
          WHEN status = 'pending' THEN 3
          ELSE 4 
        END,
        createdAt DESC 
      LIMIT 1
    `).get(req.user.id, req.user.id);
  }

  const rideId = ride?.id || null;
  const driverName = ride?.driverName || null;

  db.prepare(`
    INSERT INTO sos_alerts (id, userId, userName, driverName, rideId, location, status, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, req.user.id, user?.name || 'Passenger', driverName, rideId, locationStr, 'active', new Date().toISOString());

  console.log(`[EMERGENCY SERVICES ALERT] SOS triggered by User ID: ${req.user.id} at Location: ${locationStr}`);

  res.status(201).json({ message: 'SOS triggered successfully, emergency services alerted', alertId: id });
};

export const getSOSAlerts = (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const baseQuery = `
    SELECT 
      s.id,
      s.userId,
      COALESCE(u.name, s.userName, 'Passenger') AS customerName,
      COALESCE(u.name, s.userName, 'Passenger') AS userName,
      u.phone AS customerPhone,
      COALESCE(d.name, b.driverName, s.driverName) AS driverName,
      COALESCE(d.phone, b.driverPhone) AS driverPhone,
      COALESCE(s.rideId, b.id) AS rideId,
      s.location,
      s.status,
      s.timestamp,
      s.resolvedAt
    FROM sos_alerts s
    LEFT JOIN users u ON s.userId = u.id
    LEFT JOIN bookings b ON (
      s.rideId = b.id OR (
        s.rideId IS NULL AND b.id = (
          SELECT id FROM bookings 
          WHERE customerId = s.userId 
          ORDER BY 
            CASE 
              WHEN status = 'in_progress' THEN 1
              WHEN status = 'accepted' THEN 2
              WHEN status = 'pending' THEN 3
              ELSE 4 
            END,
            createdAt DESC 
          LIMIT 1
        )
      )
    )
    LEFT JOIN users d ON (b.driverId = d.id)
    ${isAdmin ? '' : 'WHERE s.userId = ?'}
    ORDER BY s.timestamp DESC
  `;

  const alerts = isAdmin 
    ? db.prepare(baseQuery).all() 
    : db.prepare(baseQuery).all(req.user.id);
  
  // Parse location JSON string back to object if possible
  const formattedAlerts = alerts.map(a => {
    try {
      return { ...a, location: typeof a.location === 'string' ? JSON.parse(a.location) : a.location };
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
