import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/adminModel.js';

dotenv.config();

const seedAdmin = async () => {
  try {
  await mongoose.connect(process.env.MONGO_URI);

  const seedEmail = 'Viransh@123';
  const adminExists = await Admin.findOne({ email: seedEmail.toLowerCase() });

    if (adminExists) {
  console.log('Admin already exists:', adminExists.email);
      process.exit();
    }

    const admin = new Admin({
  email: seedEmail,
  password: 'Viransh@123', // default password same as email per request
    });

    await admin.save();
    console.log('Admin seeded successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
