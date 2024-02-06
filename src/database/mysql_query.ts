import * as _ from "lodash";
const mysql = require("mysql2/promise");
import * as mysqldb from "mysql2";

export class MysqlQuery {
  public static readonly MAX_QUERY_ITEMS = 500;
  private pool: mysqldb.Pool;

  constructor() {
    this.pool = require("./mysql_db").pool;
  }

  public async getAdmin(InputName: string, Password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        } else {
          this.pool.query(
            `SELECT name,password FROM admin WHERE name = ? AND password = ?`,
            [InputName, Password],
            (err, res) => {
              connection.release();
              if (err) resolve(false);
              else {
                resolve(true);
              }
            }
          );
        }
      });
    });
  }
}
