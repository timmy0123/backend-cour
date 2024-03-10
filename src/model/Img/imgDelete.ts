import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import { deleteResuld } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function imgDelete(fileName: string) {
  return new Promise<deleteResuld>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject("database broken");
      else {
        pool.query(
          `DELETE FROM Image WHERE fileName=?`,
          [fileName],
          (err, res: any) => {
            connection.release();
            if (err) reject("database broken");
            else {
              resolve("success delete");
            }
          }
        );
      }
    });
  });
};
