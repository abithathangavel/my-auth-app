const mongoose = require('mongoose');

// Define Property schema
const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true 
  },
  area: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  }, 
  bathrooms: {
    type: Number,
    required: true
  },
  nearbyHospitals: {
    type: [String]
  },
  nearbyColleges: {
    type: [String]
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: { type: Number, default: 0 }
});

// Define User schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    default: 'buyer'
  },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] ,
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] 
});

const Property = mongoose.model('Property', PropertySchema);
const User = mongoose.model('User', UserSchema);

module.exports = { Property, User };
