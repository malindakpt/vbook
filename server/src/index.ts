import { DB } from 'services/db.connection';
import { UserModel } from 'models/user/user.model';
import { startApplication } from 'services/app.service';
// import { User } from '../../shared/src/index';

const authenticateConnnection = async () => {
  try {
    // await DB.getInstance().authenticate();
    // await UserModel.drop();
    // await UserModel.sync();
    // const user = UserModel.build({name: 'anumi'});
    // await user.save();
    // const data = await UserModel.findAll();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// const db = new DB();
// authenticateConnnection();
startApplication();






// const user = UsersModel.build({firstName: 'Malinda'});
// UsersModel.create()
