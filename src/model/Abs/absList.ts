import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { absList } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function absList() {
  return new Promise<absList[]>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject("database broken");
      else {
        pool.query(`SELECT * FROM abs`, (err: any, res: absList[]) => {
          connection.release();
          if (err) reject(`err: ${err}`);
          else {
            let Items: absList[] = [];
            for (let i = 0; i < res.length; i++) {
              let cur = res[i];

              Items.push({
                id: cur.id,
                pictureUrl: `${config.url_config.absurl}/${cur.pictureUrl}`,
                title: cur.title,
                subtitle: cur.subtitle,
                Description: cur.Description,
              });
            }
            resolve(Items);
          }
        });
      }
    });
  });
};
