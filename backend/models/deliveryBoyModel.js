import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const deliveryBoySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastKnownLat: {
    type: Number,
    default: null,
  },
  lastKnownLng: {
    type: Number,
    default: null,
  },
  lastLocationUpdatedAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

// Hash password before saving
deliveryBoySchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
deliveryBoySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const DeliveryBoy = mongoose.model('DeliveryBoy', deliveryBoySchema);

export default DeliveryBoy;
