import { DB } from 'dbConnection/DBConnection';
import { UserModel } from 'models/User';
// import { User } from '../../shared/src/index';

const authenticateConnnection = async () => {
  try {
    await DB.getInstance().authenticate();
    await UserModel.sync();


    // const user = UserModel.build({name: 'anumi'});
    // await user.save();
    const data = await UserModel.findAll();
    console.log('Connection has been established successfully.', data.map(user => `${user.toJSON()} ${user}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// const db = new DB();
authenticateConnnection();





// const user = UsersModel.build({firstName: 'Malinda'});
// UsersModel.create()
