import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { Imageurl, ImageList } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function imgList() {
  return new Promise<Imageurl[]>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject("database broken");
      } else {
        pool.query(
          `SELECT fileName,used FROM Image`,
          (err: any, res: ImageList[]) => {
            connection.release();
            if (err) reject("database broken");
            else {
              let Imgs: Imageurl[] = [];
              for (let i = 0; i < res.length; i++) {
                let cur = res[i];
                Imgs.push({
                  url: `${config.url_config.url}/${cur.fileName}`,
                  used: cur.used,
                });
              }
              resolve(Imgs);
            }
          }
        );
      }
    });
  });
};
