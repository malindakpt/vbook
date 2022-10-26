import { DB } from 'services/db.connection';
import { DataTypes, Model } from 'sequelize';
import { ResetModel } from 'models/reset/reset.model';

class Entity extends Model {}
export class UserModel extends Model {};

export const attributes = {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
};
UserModel.init(attributes, { // Other model options go here
  sequelize: DB.getInstance(), // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

