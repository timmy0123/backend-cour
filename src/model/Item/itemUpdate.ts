import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { updateResult } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function itemUpdate(
  id: string,
  itemName: string,
  title: string,
  subtitle: string,
  itemDescription: string
) {
  return new Promise<updateResult>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject("database broken");
      } else {
        pool.query(
          `Update item 
               SET itemName = ?, title = ?, subtitle = ?, itemDescription = ?
               WHERE id = ?`,
          [itemName, title, subtitle, itemDescription, id],
          (err, res) => {
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
