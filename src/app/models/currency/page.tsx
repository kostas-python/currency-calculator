import { sequelize } from '@/app/database/data/page';
import { DataTypes, Model } from 'sequelize';


// Defining the Currency model by extending Sequelize's Model class

class Currency extends Model {
  public base!: string;
  public target!: string;
  public rate!: number;
}


// Initializing the Currency model with the required fields and their configurations

Currency.init(
  {
    // 'base' field will store the base currency code as a string (e.g., "USD")

    base: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 'target' field will store the target currency code as a string (e.g., "EUR")

    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 'rate' field will store the exchange rate as a float number (e.g., 0.85 for USD to EUR)

    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,   // Links the model to the sequelize instance for database interaction
    modelName: 'Currency',  // Name of the model, which is used when referring to the table in Sequelize
  }
);


export default Currency;
