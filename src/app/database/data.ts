
import dotenv from 'dotenv';
import { seedCurrencies } from '@/app/database/seed';  // Import the seed function
import { Sequelize } from 'sequelize';
import User from '@/models/user';
import Currency from '@/models/currency';

dotenv.config();

// Initialize the Sequelize instance with SQLite as the dialect
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Combined function for syncing and optionally seeding the database
async function initializeDatabase() {
  try {
    // Sync all models with the database
    await sequelize.sync();
    console.log('Database synced successfully');
    
    // Seed initial currency data if necessary
    await seedCurrencies();
    console.log('Initial currency data seeded');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

// Initialize and sync the database
initializeDatabase();

// Export Sequelize instance and models for use in other files
export { sequelize, User, Currency };

