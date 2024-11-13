import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();


// Set up Sequelize to use SQLite

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // This file will store the SQLite database
});

export default sequelize;
