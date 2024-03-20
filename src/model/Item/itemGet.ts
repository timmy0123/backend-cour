import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { ItemList, Itemdb } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function itemGet(itemName: string) {
  return new Promise<ItemList>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject("database broken");
      else {
        pool.query(
          `SELECT 
            item.id,
            pictureUrl,
            item.itemName,
            title,
            subtitle,
            itemDescription, 
            GROUP_CONCAT(store_location.id  SEPARATOR ', ') AS locid,
            GROUP_CONCAT(store_location.country  SEPARATOR ', ') AS city,
            GROUP_CONCAT(store_location.district  SEPARATOR ', ') AS district, 
            GROUP_CONCAT(store_location.storeName  SEPARATOR ', ') AS storeName, 
            GROUP_CONCAT(store_location.address  SEPARATOR ', ') AS address 
        FROM 
            item 
        JOIN 
            store_location ON item.itemName = store_location.itemName
        WHERE 
            item.itemName = ?
        GROUP BY 
            item.id`,
          [itemName],
          (error, res: any) => {
            connection.release();
            if (err) reject(`err: ${err}`);
            else {
              if (res.length > 0) {
                res = res[0];
                resolve({
                  id: res.id,
                  locid: res.locid.split(", "),
                  pictureUrl: `${config.url_config.itemurl}/${res.pictureUrl}`,
                  itemName: res.itemName,
                  title: res.title,
                  subtitle: res.subtitle,
                  itemDescription: res.itemDescription,
                  storeName: res.storeName.split(", "),
                  city: res.city.split(", "),
                  district: res.district.split(", "),
                  address: res.address.split(", "),
                });
              } else reject("no data");
            }
          }
        );
      }
    });
  });
};
