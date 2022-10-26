import { DB } from 'services/db.connection';
import { DataTypes, Model } from 'sequelize';

class Entity extends Model {}
export class ResetModel extends Model {};

export const attributes = {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiary: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};
ResetModel.init(attributes, { // Other model options go here
  sequelize: DB.getInstance(), // We need to pass the connection instance
  modelName: 'Reset' // We need to choose the model name
});
