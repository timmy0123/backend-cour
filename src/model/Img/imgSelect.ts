import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { ImageList, updateResult } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function imgSelect(selectedImgs: string[]) {
  return new Promise<updateResult>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject("database broken");
      } else {
        pool.query(
          `UPDATE Image SET used = false;`,
          (err: any, res: ImageList[]) => {
            if (err) reject("database broken");
            else {
              var ids = selectedImgs
                .map(function (a) {
                  return "'" + a.replace("'", "''") + "'";
                })
                .join();

              var sql = `UPDATE Image 
                  SET used = true
                  WHERE fileName IN (${ids});`;

              pool.query(sql, (err: any, res: any) => {
                connection.release();
                if (err) {
                  reject(`Err: ${err}`);
                } else {
                  resolve("success update");
                }
              });
            }
          }
        );
      }
    });
  });
};
