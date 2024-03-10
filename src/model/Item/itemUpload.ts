import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { uploadResuld } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function itemUpload(
  pictureUrl: string,
  itemName: string,
  title: string,
  subtitle: string,
  itemDescription: string
) {
  return new Promise<uploadResuld>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject("database broken");
      } else {
        pool.query(
          `INSERT INTO item (id, pictureUrl, itemName, title, subtitle, itemDescription)
               VALUES (?,?,?,?,?,?)`,
          [uuidv4(), pictureUrl, itemName, title, subtitle, itemDescription],
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
