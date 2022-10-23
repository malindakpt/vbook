import { Sequelize } from 'sequelize';

console.log('start');

const sequelize = new Sequelize('postgres', 'postgres', '123', {
  host: 'localhost',
  dialect:
    'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

auth();
