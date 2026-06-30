import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import DeliveryBoy from '../models/deliveryBoyModel.js';

// Load env (same logic as server)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

/*
 * This script will:
 * 1. Connect to Mongo
 * 2. Remove ALL existing delivery boy accounts
 * 3. Create 10 new accounts:
 *    delivery1..delivery10 (name + email delivery{n}@gmail.com)
 *    Password: password123 (hashed by model pre-save)
 *    Phone numbers: sequential based on a base number (configurable)
 */

const TOTAL = 10;
const PASSWORD = 'password123';
const BASE_PHONE = '885581743'; // last digit will be appended (1..0)

const seedDeliveryBoys = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not defined. Check backend/.env file and path.');
    }

    await mongoose.connect(process.env.MONGO_URI, { dbName: 'viransh-restaurant' });
    console.log('Connected to MongoDB');

    // Clear existing
    const existingCount = await DeliveryBoy.countDocuments();
    if (existingCount > 0) {
      await DeliveryBoy.deleteMany({});
      console.log(`Removed ${existingCount} existing delivery boy account(s).`);
    } else {
      console.log('No existing delivery boy accounts to remove.');
    }

    // Create new
    const created = [];
    for (let i = 1; i <= TOTAL; i++) {
      const name = `delivery${i}`;
      const email = `delivery${i}@gmail.com`;
      // Ensure phone stays 10 digits; wrap 10 -> 0
      const phoneLastDigit = i % 10; // 10 -> 0
      const phone = `${BASE_PHONE}${phoneLastDigit}`;
      const doc = await DeliveryBoy.create({ name, email, password: PASSWORD, phone });
      created.push({ name: doc.name, email: doc.email, phone, password: PASSWORD });
    }

    console.log(`Created ${created.length} delivery boy accounts:`);
    created.forEach(u => console.log(` - ${u.name} | ${u.email} | ${u.phone} | password: ${u.password}`));

    console.log('\nAll passwords are the same (password123). In production, force change on first login.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding delivery boys:', err.message);
    process.exit(1);
  }
};

seedDeliveryBoys();
