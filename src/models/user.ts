import { sequelize } from '@/app/database/data';
import { DataTypes, Model } from 'sequelize';



class User extends Model {
  public username!: string;
  public password!: string;
  public id!: number;       // We define the 'id' property type as a number
}


// Initialize the 'User' model with Sequelize

try {
  User.init(

    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      // Username section
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Username cannot be empty',
          },
          len: {
            args: [3, 20],
            msg: 'Username must be between 3 and 20 characters',
          },
        },
      },

      // password section
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password cannot be empty',
          },
          len: {
            args: [8, 20],
            msg: 'Password must be between 8 and 20 characters',
        },
        isString(value: string) {
          if (typeof value !== 'string') {
            throw new Error('Password must be a string');
          }
        },
      },
      set(value: string | number) {
        
        // both strings and numbers should be stored as strings
        
        this.setDataValue('password', value.toString());
      },
    },
  },
  {
    sequelize,      // Links the model to the sequelize instance for database interaction
    modelName: 'User', // Name of the model, which is used when referring to the table in Sequelize
  }
);

} catch (error) {
  
    // Catch any errors that occur during model initialization

    console.error('Error initializing User model:', error);
    
  }

export default User ;