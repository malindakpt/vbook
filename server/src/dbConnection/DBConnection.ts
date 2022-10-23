import { Sequelize } from 'sequelize';
export class DB {
  private static sequelize: Sequelize;

  public static getInstance = () => {
    if (!this.sequelize) {
      this.sequelize = new Sequelize('postgres', 'postgres', '123', {
        host: 'localhost',
        dialect:
          'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
      });
    }
    return this.sequelize;
  };
}
