import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../config";
import { ImageList, Imageurl, ItemList, Itemdb } from "../interface/interface";
import { add } from "lodash";

const mysql = require("mysql2/promise");

export class MysqlQuery {
  public static readonly MAX_QUERY_ITEMS = 500;
  private pool: mysqldb.Pool;

  constructor() {
    this.pool = require("./mysql_db").pool;
  }

  public async getAdmin(InputName: string, Password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        } else {
          this.pool.query(
            `SELECT name,password FROM admin WHERE name = ? AND password = ?`,
            [InputName, Password],
            (err, res: any) => {
              connection.release();
              if (err) resolve(false);
              else {
                if (res && res.length > 0) resolve(true);
                else resolve(false);
              }
            }
          );
        }
      });
    });
  }

  public async UploadImg(FileName: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        } else {
          this.pool.query(
            `INSERT INTO Image (id, fileName, used)
             VALUES (?,?,?)`,
            [uuidv4(), FileName, false],
            (err, res) => {
              connection.release();
              if (err) resolve(false);
              else {
                resolve(true);
              }
            }
          );
        }
      });
    });
  }

  public async DeleteImg(FileName: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        } else {
          this.pool.query(
            `DELETE FROM Image WHERE fileName = ?`,
            [FileName],
            (err, res) => {
              connection.release();
              if (err) resolve(false);
              else {
                resolve(true);
              }
            }
          );
        }
      });
    });
  }

  public async ListImg(): Promise<Imageurl[] | null> {
    return new Promise<Imageurl[] | null>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(null);
        } else {
          this.pool.query(
            `SELECT fileName,used FROM Image`,
            (err: any, res: ImageList[]) => {
              connection.release();
              if (err) resolve(null);
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
  }

  public async SelectImg(Imgs: string[]): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        } else {
          this.pool.query(
            `UPDATE Image SET used = false;            `,
            (err: any, res: ImageList[]) => {
              if (err) resolve(false);
              else {
                var ids = Imgs.map(function (a) {
                  return "'" + a.replace("'", "''") + "'";
                }).join();

                var sql = `UPDATE Image 
                SET used = true
                WHERE fileName IN (${ids});`;

                this.pool.query(sql, (err: any, res: any) => {
                  connection.release();
                  if (err) {
                    resolve(false);
                  } else {
                    resolve(true);
                  }
                });
              }
            }
          );
        }
      });
    });
  }

  public async ListItem(): Promise<ItemList[] | null> {
    return new Promise<ItemList[] | null>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) resolve(null);
        else {
          this.pool.query(
            `SELECT item.id,pictureUrl,item.itemName,title,subtitle,itemDescription, 
             GROUP_CONCAT(store_location.country  SEPARATOR ', ') AS city,
             GROUP_CONCAT(store_location.district  SEPARATOR ', ') AS district, 
             GROUP_CONCAT(store_location.address  SEPARATOR ', ') AS address FROM item 
             JOIN store_location 
             ON item.itemName = store_location.itemName
             GROUP BY item.itemName`,
            (err: any, res: Itemdb[]) => {
              connection.release();
              if (err) resolve(null);
              else {
                let Items: ItemList[] = [];
                for (let i = 0; i < res.length; i++) {
                  let cur = res[i];

                  Items.push({
                    id: cur.id,
                    pictureUrl: `${config.url_config.itemurl}/${cur.pictureUrl}`,
                    itemName: cur.itemName,
                    title: cur.title,
                    subtitle: cur.subtitle,
                    itemDescription: cur.itemDescription,
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
  }

  public async UploadItem(
    pictureUrl: string,
    itemName: string,
    title: string,
    subtitle: string,
    itemDescription: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        } else {
          this.pool.query(
            `INSERT INTO item (id, pictureUrl, itemName, title, subtitle, itemDescription)
             VALUES (?,?,?,?,?,?)`,
            [uuidv4(), pictureUrl, itemName, title, subtitle, itemDescription],
            (err, res) => {
              connection.release();
              if (err) resolve(false);
              else {
                resolve(true);
              }
            }
          );
        }
      });
    });
  }

  public async DeleteItem(ItemName: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        } else {
          this.pool.query(
            `DELETE FROM item WHERE itemName = ?`,
            [ItemName],
            (err, res) => {
              connection.release();
              if (err) resolve(false);
              else {
                resolve(true);
              }
            }
          );
        }
      });
    });
  }

  public async UploadLoc(
    itemName: string,
    city: string,
    district: string,
    address: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        } else {
          this.pool.query(
            `INSERT INTO store_location (id,itemName,country,district,address)
             VALUES (?,?,?,?,?,?)`,
            [uuidv4(), itemName, city, district, address],
            (err, res) => {
              connection.release();
              if (err) resolve(false);
              else {
                resolve(true);
              }
            }
          );
        }
      });
    });
  }

  public async Deleteloc(ItemName: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          resolve(false);
        } else {
          this.pool.query(
            `DELETE FROM store_location WHERE itemName = ?`,
            [ItemName],
            (err, res) => {
              connection.release();
              if (err) resolve(false);
              else {
                resolve(true);
              }
            }
          );
        }
      });
    });
  }
}
