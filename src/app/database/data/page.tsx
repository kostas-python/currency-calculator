import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from '@/app/models/user/page';
import Currency from '@/app/models/currency/page';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log('Database synced');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
}

// Sync database
syncDatabase();

export { sequelize, User, Currency };
