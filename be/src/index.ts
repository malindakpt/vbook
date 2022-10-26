import { DB } from 'services/db.connection';
import { UserModel } from 'models/user/user.model';
import { startApplication } from 'services/app.service';
import { DataTypes } from 'sequelize';
import { ResetModel } from 'models/reset/reset.model';
import { User } from 'models/user/user';
// import { User } from '../../shared/src/index';

const resetDB = async () => {
  try {
    // await DB.getInstance().authenticate();
    // await UserModel.drop();

    // UserModel.hasMany(ResetModel);
    // ResetModel.belongsTo(UserModel);
    await UserModel.sync();
    // await ResetModel.sync();

    UserModel.findAll
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};



// const db = new DB();
resetDB();
startApplication();



const A = DB.getInstance().define('A', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

const B = DB.getInstance().define('B', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
}) 
