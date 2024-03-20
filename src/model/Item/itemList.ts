import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import { ItemList, Itemdb } from "../../interface/interface";

const mysql = require("mysql2/promise");
const pool: mysqldb.Pool = require("../mysql_db").pool;

module.exports = function itemList() {
  return new Promise<ItemList[]>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject("database broken");
      else {
        pool.query(
          `SELECT item.id,pictureUrl,item.itemName,title,subtitle,itemDescription, 
             GROUP_CONCAT(store_location.id  SEPARATOR ', ') AS locid,
             GROUP_CONCAT(store_location.country  SEPARATOR ', ') AS city,
             GROUP_CONCAT(store_location.district  SEPARATOR ', ') AS district, 
             GROUP_CONCAT(store_location.storeName  SEPARATOR ', ') AS storeName, 
             GROUP_CONCAT(store_location.address  SEPARATOR ', ') AS address FROM item 
             JOIN store_location 
             ON item.itemName = store_location.itemName
             GROUP BY item.id`,
          (err: any, res: Itemdb[]) => {
            connection.release();
            if (err) reject(`err: ${err}`);
            else {
              let Items: ItemList[] = [];
              for (let i = 0; i < res.length; i++) {
                let cur = res[i];
                Items.push({
                  id: cur.id,
                  locid: cur.locid.split(", "),
                  pictureUrl: `${config.url_config.itemurl}/${cur.pictureUrl}`,
                  itemName: cur.itemName,
                  title: cur.title,
                  subtitle: cur.subtitle,
                  itemDescription: cur.itemDescription,
                  storeName: cur.storeName.split(", "),
                  city: cur.city.split(", "),
                  district: cur.district.split(", "),
                  address: cur.address.split(", "),
                });
              }
              resolve(Items);
            }
          }
        );
      }
    });
  });
};
