const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyparser.json());

const customerroutes = require('../REDBUS-CLONE-MEAN-main/REDBUS-CLONE-MEAN-main/frontend/server/routes/customer');
const routesroute = require('../REDBUS-CLONE-MEAN-main/REDBUS-CLONE-MEAN-main/frontend/server/routes/route');
const bookingroute = require('../REDBUS-CLONE-MEAN-main/REDBUS-CLONE-MEAN-main/frontend/server/routes/booking');

app.use(bookingroute);
app.use(routesroute);
app.use(customerroutes);

const DBURL = process.env.MONGODB_URI;

if (!DBURL) {
  throw new Error('MONGODB_URI environment variable is required. Set it in your Vercel project settings.');
}

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(DBURL);
  isConnected = true;
  console.log('MongoDB connected');
};

connectDB().catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
