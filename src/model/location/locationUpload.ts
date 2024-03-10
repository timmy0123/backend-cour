import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { uploadResuld } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function locationUpload(
  itemName: string,
  storeName: string,
  city: string,
  district: string,
  address: string
) {
  return new Promise<uploadResuld>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject("database broken");
      } else {
        pool.query(
          `INSERT INTO store_location (id,itemName,storeName,country,district,address)
               VALUES (?,?,?,?,?,?)`,
          [uuidv4(), itemName, storeName, city, district, address],
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
