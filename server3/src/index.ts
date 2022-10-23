import { DB } from 'dbConnection/DBConnection';
import { User } from '../../shared/src/index';

const authenticateConnnection = async () => {
  try {
    await DB.getInstance().authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const db = new DB();
authenticateConnnection();

const user = new User('', 'asd');
user.firstName = 'asdad';
// const user = UsersModel.build({firstName: 'Malinda'});
// UsersModel.create()
