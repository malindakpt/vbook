import { config } from 'config';
import { Sequelize } from 'sequelize';
export class DB {
  private static sequelize: Sequelize;

  public static getInstance = () => {
    if (!this.sequelize) {
      this.sequelize = new Sequelize('rootadmin@vbookdb', 'rootadmin@vbookdb', 'abcd1234@', {
        logging: config.dbLogger,
        host: 'vbookdb.postgres.database.azure.com',
        ssl: true,
        // dialectOptions: {
        //   "ssl": {
        //     "require": false
        //  }
        // },
        dialect:
          'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
      });
    }
    return this.sequelize;
  };
}


// vbookdb.postgres.database.azure.com

// export class DB {
//   private static sequelize: Sequelize;

//   public static getInstance = () => {
//     if (!this.sequelize) {
//       this.sequelize = new Sequelize('postgres', 'postgres', config.dbPassword, {
//         logging: config.dbLogger,
//         host: 'localhost',
//         dialect:
//           'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//       });
//     }
//     return this.sequelize;
//   };
// }