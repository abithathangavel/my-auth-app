const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./models/User');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Allow CORS for http://localhost:8081
app.use(cors((req, callback) => {
  const whitelist = ['http://localhost:8080', 'http://localhost:8081'];
  const corsOptions = { origin: whitelist.includes(req.header('Origin')) };
  callback(null, corsOptions);
}))

mongoose.connect("mongodb://127.0.0.1/auth_demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});


app.post('/signup', async (req, res) => {
  const { firstName,lastName, email, phoneNumber,password,role} = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName,lastName, email, phoneNumber, password: hashedPassword,role });
    await newUser.save();
    res.send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    // Check user role and redirect accordingly
    if (user.role === 'seller') {
      res.send({ message: 'Login successful', user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, redirectTo: '/seller' });
    } else {
      res.send({ message: 'Login successful', user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, redirectTo: '/buyer' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
