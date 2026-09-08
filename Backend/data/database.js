import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'ridesphere.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT,
    phone TEXT,
    licenseNumber TEXT,
    vehicleNumber TEXT,
    vehicleType TEXT,
    vehicleModel TEXT,
    vehicleColor TEXT,
    rating REAL,
    totalRides INTEGER,
    available INTEGER,
    joinedAt TEXT,
    verified INTEGER
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    customerId TEXT,
    driverName TEXT,
    customerName TEXT,
    driverId TEXT,
    driverPhone TEXT,
    vehicleModel TEXT,
    vehicleNumber TEXT,
    driverRating REAL,
    pickup TEXT,
    destination TEXT,
    distance TEXT,
    baseFare REAL,
    rideFare REAL,
    total REAL,
    status TEXT,
    eta TEXT,
    safeRideEnabled INTEGER,
    rideType TEXT,
    createdAt TEXT
  );

  CREATE TABLE IF NOT EXISTS sos_alerts (
    id TEXT PRIMARY KEY,
    userId TEXT,
    userName TEXT,
    driverName TEXT,
    rideId TEXT,
    location TEXT,
    status TEXT,
    timestamp TEXT,
    resolvedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS locations (
    userId TEXT PRIMARY KEY,
    lat REAL,
    lng REAL,
    timestamp TEXT
  );
`);

// Seed data
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;

if (userCount === 0) {
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password, role, phone, licenseNumber, vehicleNumber, vehicleType, vehicleModel, vehicleColor, rating, totalRides, available, joinedAt, verified)
    VALUES (@id, @name, @email, @password, @role, @phone, @licenseNumber, @vehicleNumber, @vehicleType, @vehicleModel, @vehicleColor, @rating, @totalRides, @available, @joinedAt, @verified)
  `);

  const users = [
    {id:'u1', name:'Abhay Prasad', email:'abhay@example.com', password: bcrypt.hashSync('password123', 10), role:'customer', phone:'+91 94470 12345', licenseNumber: null, vehicleNumber: null, vehicleType: null, vehicleModel: null, vehicleColor: null, rating: null, totalRides:42, available: null, joinedAt:'2024-01-15', verified: null},
    {id:'u2', name:'Priya Menon', email:'priya@example.com', password: bcrypt.hashSync('password123', 10), role:'customer', phone:'+91 90001 23456', licenseNumber: null, vehicleNumber: null, vehicleType: null, vehicleModel: null, vehicleColor: null, rating: null, totalRides:18, available: null, joinedAt:'2024-03-10', verified: null},
    {id:'d1', name:'Rajesh Kumar', email:'rajesh@example.com', password: bcrypt.hashSync('password123', 10), role:'driver', phone:'+91 98001 11234', licenseNumber:'KL-1234-5678', vehicleNumber:'KL 07 AX 4521', vehicleType:'Sedan', vehicleModel:'Hyundai i20', vehicleColor:'Silver', rating:4.8, totalRides:1284, available:1, joinedAt:'2023-06-20', verified:1},
    {id:'d2', name:'Suresh Nair', email:'suresh@example.com', password: bcrypt.hashSync('password123', 10), role:'driver', phone:'+91 97002 22345', licenseNumber:'KL-8765-4321', vehicleNumber:'KL 05 BX 7890', vehicleType:'SUV', vehicleModel:'Mahindra XUV300', vehicleColor:'White', rating:4.6, totalRides:876, available:0, joinedAt:'2023-09-14', verified:1},
    {id:'d3', name:'Anil Varghese', email:'anil@example.com', password: bcrypt.hashSync('password123', 10), role:'driver', phone:'+91 96003 33456', licenseNumber:'KL-5555-9999', vehicleNumber:'KL 10 CX 2341', vehicleType:'Hatchback', vehicleModel:'Maruti Swift', vehicleColor:'Blue', rating:4.9, totalRides:2100, available:1, joinedAt:'2022-11-05', verified:1},
    {id:'a1', name:'Admin User', email:'admin@ridesphere.in', password: bcrypt.hashSync('admin123', 10), role:'admin', phone:'+91 80000 00001', licenseNumber: null, vehicleNumber: null, vehicleType: null, vehicleModel: null, vehicleColor: null, rating: null, totalRides: null, available: null, joinedAt: null, verified: null}
  ];

  db.transaction(() => {
    for (const u of users) {
      insertUser.run(u);
    }
  })();
}

const bookingCount = db.prepare('SELECT COUNT(*) as count FROM bookings').get().count;

if (bookingCount === 0) {
  const insertBooking = db.prepare(`
    INSERT INTO bookings (id, customerId, driverName, customerName, driverId, driverPhone, vehicleModel, vehicleNumber, driverRating, pickup, destination, distance, baseFare, rideFare, total, status, eta, safeRideEnabled, rideType, createdAt)
    VALUES (@id, @customerId, @driverName, @customerName, @driverId, @driverPhone, @vehicleModel, @vehicleNumber, @driverRating, @pickup, @destination, @distance, @baseFare, @rideFare, @total, @status, @eta, @safeRideEnabled, @rideType, @createdAt)
  `);

  const bookings = [
    {id:'b1', customerId:'u1', driverName:'Rajesh Kumar', customerName:'Abhay Prasad', driverId:'d1', driverPhone:'+91 98001 11234', vehicleModel:'Hyundai i20', vehicleNumber:'KL 07 AX 4521', driverRating:4.8, pickup:'Pala', destination:'Kottayam', distance:'28 km', baseFare:50, rideFare:350, total:400, status:'completed', eta:'N/A', safeRideEnabled:1, rideType:'Standard', createdAt: new Date(Date.now() - 86400000 * 2).toISOString()},
    {id:'b2', customerId:'u1', driverName:'Rajesh Kumar', customerName:'Abhay Prasad', driverId:'d1', driverPhone:'+91 98001 11234', vehicleModel:'Hyundai i20', vehicleNumber:'KL 07 AX 4521', driverRating:4.8, pickup:'Ernakulam', destination:'Kottayam', distance:'65 km', baseFare:50, rideFare:950, total:1000, status:'completed', eta:'N/A', safeRideEnabled:1, rideType:'Standard', createdAt: new Date(Date.now() - 86400000).toISOString()},
    {id:'b3', customerId:'u1', driverName:'Rajesh Kumar', customerName:'Abhay Prasad', driverId:'d1', driverPhone:'+91 98001 11234', vehicleModel:'Hyundai i20', vehicleNumber:'KL 07 AX 4521', driverRating:4.8, pickup:'IIIT Kottayam', destination:'Kottayam Railway Station', distance:'35 km', baseFare:50, rideFare:450, total:500, status:'in_progress', eta:'45 mins', safeRideEnabled:1, rideType:'Standard', createdAt: new Date().toISOString()}
  ];

  db.transaction(() => {
    for (const b of bookings) {
      insertBooking.run(b);
    }
  })();
}

export default db;
