const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable must be set in production');
}
const JWT_SECRET = process.env.JWT_SECRET || 'redbus-elite-secret-key-dev-only';
const JWT_EXPIRES_IN = '7d';

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    const existing = await Customer.findOne({ email }).lean().exec();
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const customer = new Customer({ name, email, passwordHash });
    const saved = await customer.save();
    const token = jwt.sign({ id: saved._id, email: saved.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const { passwordHash: _passwordHash, ...customerData } = saved.toObject();
    res.status(201).json({ token, customer: customerData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const customer = await Customer.findOne({ email }).exec();
    if (!customer || !customer.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, customer.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: customer._id, email: customer.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const { passwordHash: _passwordHash, ...customerData } = customer.toObject();
    res.json({ token, customer: customerData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { name, email, googleId, profilePicture } = req.body;
    if (!name || !email || !googleId) {
      return res.status(400).json({ error: 'Name, email and googleId are required' });
    }
    let customer = await Customer.findOne({ email }).exec();
    if (!customer) {
      customer = new Customer({ name, email, googleId, profilePicture });
      await customer.save();
    } else if (!customer.googleId) {
      customer.googleId = googleId;
      if (profilePicture) customer.profilePicture = profilePicture;
      await customer.save();
    }
    const token = jwt.sign({ id: customer._id, email: customer.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const { passwordHash: _passwordHash, ...customerData } = customer.toObject();
    res.json({ token, customer: customerData });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
