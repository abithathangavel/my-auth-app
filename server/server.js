const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const { User, Property } = require('./models/User');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Allow CORS for specific origins
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081'] // Update with your actual frontend URL if different
}));

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/auth_demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Serve static files from the Vue.js build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, phoneNumber, password: hashedPassword, role });
    await newUser.save();
    res.send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Login endpoint
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
    if (user.role === 'seller') {
      res.send({ message: 'Login successful', user: { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, redirectTo: '/seller' });
    } else {
      res.send({ message: 'Login successful', user: { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, redirectTo: '/buyer' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Endpoint for seller to post a property
app.post('/properties', async (req, res) => {
  console.log(req.body);
  const { title, description, location, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges, userId } = req.body;
  try {
    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).send({ message: 'User ID is required' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Create a new property
    const property = new Property({
      title,
      description,
      location,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
      postedBy: userId // Assign the user ID as the postedBy field
    });
    await property.save();

    // Add the property to the user's properties list
    user.properties.push(property);
    await user.save();

    res.status(201).send({ message: 'Property posted successfully' });
  } catch (error) {
    console.error('Error posting property:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Endpoint to edit a property
app.put('/properties/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, location, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }

    // Update the property details
    property.title = title;
    property.description = description;
    property.location = location;
    property.area = area;
    property.bedrooms = bedrooms;
    property.bathrooms = bathrooms;
    property.nearbyHospitals = nearbyHospitals;
    property.nearbyColleges = nearbyColleges;

    await property.save();
    res.send({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Endpoint to delete a property
app.delete('/properties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }

    await Property.findByIdAndDelete(id);
    res.send({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Endpoint to get properties
app.get('/properties', async (req, res) => {
  const { userId, role } = req.query; // Expect userId and role as query parameters

  try {
    let properties;
    if (role === 'seller') {
      // If the user is a seller, return only their properties
      properties = await Property.find({ postedBy: userId });
    } else {
      // If the user is a buyer, return all properties
      properties = await Property.find();
    }
    res.send(properties);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Endpoint to get a single property by ID
app.get('/properties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id).populate('postedBy', 'firstName lastName email');
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }
    res.send(property);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Endpoint to add or remove interest in a property
app.post('/properties/:id/interest', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    // Find the user and the property
    const user = await User.findById(userId);
    const property = await Property.findById(id);

    if (!user || !property) {
      return res.status(404).send({ message: 'User or property not found' });
    }

    // Check if the property ID is already in the user's interests
    const index = user.interests.findIndex(interest => interest.toString() === id);

    // If the property ID is not in the user's interests, add it
    if (index === -1) {
      user.interests.push(property._id);
      await user.save();
      res.send({ message: 'Interest in property added' });
    } else {
      // If the property ID is already in the user's interests, remove it
      user.interests.splice(index, 1);
      await user.save();
      res.send({ message: 'Interest in property removed' });
    }
  } catch (error) {
    console.error('Error adding/removing interest:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Endpoint to get interests of a user
app.get('/users/:userId/interests', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('interests');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.send(user.interests);
  } catch (error) {
    console.error('Error fetching interests:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Endpoint to like a property
app.post('/properties/:id/like', async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }
    res.send({ message: 'Property liked', likes: property.likes });
  } catch (error) {
    console.error('Error liking property:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Endpoint to get seller details
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const seller = await User.findById(id);
    if (!seller) {
      return res.status(404).send({ message: 'Seller not found' });
    }
    res.send(seller);
  } catch (error) {
    console.error('Error fetching seller details:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Serve the index.html file for any unknown routes (for the frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
