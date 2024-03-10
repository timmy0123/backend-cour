import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { loginResult } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function userLogin(InputName: string, Password: string) {
  return new Promise<loginResult>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject("database broken");
      else {
        pool.query(
          `SELECT name,password FROM admin WHERE name = ? AND password = ?`,
          [InputName, Password],
          (err, res: any) => {
            connection.release();
            if (err) reject("database broken");
            else {
              console.log(InputName, Password);
              if (res && res.length > 0) resolve("login success");
              else reject("wrong user or password");
            }
          }
        );
      }
    });
  });
};
