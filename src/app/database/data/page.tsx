import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from '@/app/models/user/page';
import Currency from '@/app/models/currency/page';
import { seedCurrencies } from '@/app/database/seed/page';  // Import the seed function

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

