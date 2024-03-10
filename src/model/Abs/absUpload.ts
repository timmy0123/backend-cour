import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { uploadResuld } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function absUpload(
  pictureUrl: string,
  title: string,
  subtitle: string,
  Description: string
) {
  return new Promise<uploadResuld>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject("database broken");
      } else {
        pool.query(
          `INSERT INTO abs (id, pictureUrl, title, subtitle, Description)
               VALUES (?,?,?,?,?)`,
          [uuidv4(), pictureUrl, title, subtitle, Description],
          (err, res) => {
            connection.release();
            if (err) reject(`err: ${err}`);
            else {
              resolve("success upload");
            }
          }
        );
      }
    });
  });
};
