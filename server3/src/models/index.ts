import { DB } from 'dbConnection/DBConnection';
import User from './User';

export const UsersModel = DB.getInstance().define('User', User);
