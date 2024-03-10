import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { deleteResuld } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function locationUpload(itemName: string) {
  return new Promise<deleteResuld>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject("database broken");
      } else {
        pool.query(
          `DELETE FROM store_location WHERE itemName = ?`,
          [itemName],
          (err, res) => {
            connection.release();
            if (err) reject(`err: ${err}`);
            else {
              resolve("success delete");
            }
          }
        );
      }
    });
  });
};
