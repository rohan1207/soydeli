import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Menu from '../models/Menu.js';

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const menuDataPath = path.join(__dirname, '..', '..', 'src', 'data', 'Menu_Data.js');

/**
 * Seeds the MongoDB database with menu data using Mongoose.
 */
const seedDatabase = async () => {
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI not found in .env file. Please ensure the .env file exists in the /backend directory.');
    process.exit(1);
  }

  try {
    console.log('🚀 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'viransh-restaurant'
    });
    console.log('✅ Successfully connected to MongoDB.');

    console.log('📦 Loading menu data...');
    const menuDataModule = await import(`file://${menuDataPath}?v=${Date.now()}`);
    const menuData = menuDataModule.default;
    console.log(`👍 Found ${menuData.length} categories to import.`);

    // Mark specific items as bestsellers
    console.log('✨ Marking some items as bestsellers...');
    const bestSellerItems = ['Veg Biryani', 'Paneer Butter Masala', 'Gulab Jamun', 'Mint Mojito', 'Masala Dosa'];
    let count = 0;
    menuData.forEach(category => {
        category.items.forEach(item => {
            if (bestSellerItems.includes(item.name)) {
                item.bestSeller = true;
                count++;
            } else {
                item.bestSeller = false; // Ensure others are false
            }
        });
    });
    console.log(`👍 Marked ${count} items as bestsellers.`);

    console.log(`🗑️ Clearing existing data from the 'menus' collection...`);
    await Menu.deleteMany({});

    console.log(`🌱 Inserting ${menuData.length} categories into the database...`);
    await Menu.insertMany(menuData);
    console.log(`🎉 Successfully inserted ${menuData.length} documents.`);

  } catch (error) {
    console.error('❌ An error occurred during the seeding process:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🚪 Connection to MongoDB closed.');
  }
};

// --- Execute Script ---
(async () => {
  await seedDatabase();
})();
