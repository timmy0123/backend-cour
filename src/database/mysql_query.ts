import * as mysqldb from "mysql2";
import { v4 as uuidv4 } from "uuid";
import config from "../config";
import { ImageList, Imageurl } from "../interface/interface";

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
}
