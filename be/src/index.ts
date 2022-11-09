import { DB } from 'services/db.connection';
import { UserModel } from 'models/user.model';
import { startApplication } from 'services/app.service';
import { DataTypes } from 'sequelize';
// import { User } from 'models/user/user';
// import { User } from '../../shared/src/index';

const resetDB = async () => {
  try {
    // await DB.getInstance().authenticate();
    // await UserModel.drop();

    // UserModel.hasMany(ResetModel);
    // ResetModel.belongsTo(UserModel);
    // await UserModel.sync();

    UserModel.findAll
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};



// const db = new DB();
resetDB();
startApplication();
