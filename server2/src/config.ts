 
import dotenv from 'dotenv';

dotenv.config();
 
const {
    PUREWEB_PROJECT_CLIENT_ID = '' ,
    PUREWEB_PROJECT_CLIENT_SECRET = '',
    PUREWEB_PLATFORM_API_URL = '' ,
    COGNITE_API_BASE_URL = 'https://api.cognitedata.com',
} = process.env;

export default {
 pureweb:{
    clientId:PUREWEB_PROJECT_CLIENT_ID,
    clientSecret: PUREWEB_PROJECT_CLIENT_SECRET,
    apiUrl: PUREWEB_PLATFORM_API_URL
 },
  apiBaseUrl: COGNITE_API_BASE_URL,
  cogniteApiBaseUrl: COGNITE_API_BASE_URL
};