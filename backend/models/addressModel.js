import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  street: {
    type: String,
    required: [true, 'Street address is required.'],
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
  },
  state: {
    type: String,
    required: [true, 'State is required.'],
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required.'],
  },
  country: {
    type: String,
    required: [true, 'Country is required.'],
    default: 'India',
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required.'],
  },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

export default Address;
