import { config } from 'config';
import { Sequelize } from 'sequelize';
// export class DB {
//   private static sequelize: Sequelize;

  // public static getInstance = () => {
  //   if (!this.sequelize) {
  //     // this.sequelize = new Sequelize({
  //     //   database: "vbookdb",
  //     //   username: "rootadmin@vbookdb",
  //     //   password: "abcd1234@",
  //     //   // host: "vbookdb.postgres.database.azure.com",
  //     //   port: 5432,
  //     //   dialect: "postgres",
  //     //   // dialectOptions: {
  //     //   //   ssl: {
  //     //   //     require: true, // This will help you. But you will see nwe error
  //     //   //     rejectUnauthorized: false // This line will fix new error
  //     //   //   }
  //     //   // },
  //     //   // ssl: true
  //     // });
  //     // this.sequelize = new Sequelize('vbookdb', 'rootadmin@vbookdb', 'abcd1234@', {
  //     //   logging: config.dbLogger,
  //     //   host: 'vbookdb.postgres.database.azure.com',
  //     //   // ssl: true,
  //     //   port: 5432,
  //     //   dialectOptions: {
  //     //     "ssl": {
  //     //       "require": true
  //     //    }
  //     //   },
  //     //   dialect:
  //     //     'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  //     // });
  //   }
  //   return this.sequelize;
  // };
// }


// vbookdb.postgres.database.azure.com

export class DB {
  private static sequelize: Sequelize;

  public static getInstance = () => {
    if (!this.sequelize) {
      this.sequelize = new Sequelize({
        database: "postgres",
        username: "vbookadmin",
        password: "abcd1234@",
        host: "vbookserver.postgres.database.azure.com",
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
          }
        },
      });
      
      
      // new Sequelize('postgres', 'vbookadmin', 'abcd1234@', {
      //   logging: config.dbLogger,
      //   host: 'vbookserver.postgres.database.azure.com',
      //   port: 5432,
      //   ssl: true,
      //   dialect:
      //     'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
      // });
      // this.sequelize = new Sequelize('');
    }
    return this.sequelize;
  };
}


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