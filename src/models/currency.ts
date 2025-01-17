import { sequelize } from '@/app/database/data';
import { DataTypes, Model } from 'sequelize';

class Currency extends Model {
  public base!: string;
  public target!: string;
  public rate!: number;
}

Currency.init(
  {
    base: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Currency',
    tableName: 'currencies',
    timestamps: false,
  }
);

export default Currency;
