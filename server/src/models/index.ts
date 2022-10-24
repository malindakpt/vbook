import { DB } from 'dbConnection/DBConnection';
import { UserModel, attributes } from './User';

UserModel.init(attributes, { // Other model options go here
    sequelize: DB.getInstance(), // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});
