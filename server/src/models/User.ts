import { DB } from 'dbConnection/DBConnection';
import { DataTypes, Model } from 'sequelize';

export  class UserModel extends Model {
  declare name: string;
}
export const attributes = {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
};
UserModel.init(attributes, { // Other model options go here
  sequelize: DB.getInstance(), // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});
