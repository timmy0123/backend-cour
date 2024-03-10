import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { updateResult } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function userUpdate(InputName: string, Password: string) {
  return new Promise<updateResult>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject("database broken");
      else {
        pool.query(
          `Update admin 
           SET name=?, password=?
           WHERE id=?`,
          [InputName, Password, "1"],
          (err, res: any) => {
            connection.release();
            if (err) reject(`err: ${err}`);
            else {
              resolve("success update");
            }
          }
        );
      }
    });
  });
};
