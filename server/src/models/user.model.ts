import { DB } from 'services/db.connection';
import { DataTypes, Model } from 'sequelize';

export  class UserModel extends Model {
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone: string;
  declare password: string;
}
export const attributes = {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
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
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
};
UserModel.init(attributes, { // Other model options go here
  sequelize: DB.getInstance(), // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});
