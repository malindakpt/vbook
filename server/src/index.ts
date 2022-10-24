import { DB } from 'services/DBConnection';
import { User } from 'models/User';
// import { User } from '../../shared/src/index';

const authenticateConnnection = async () => {
  try {
    // await DB.getInstance().authenticate();
    // await User.drop();
    await User.sync();
    // const user = UserModel.build({name: 'anumi'});
    // await user.save();
    const data = await User.findAll();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// const db = new DB();
authenticateConnnection();





// const user = UsersModel.build({firstName: 'Malinda'});
// UsersModel.create()
