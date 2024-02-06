import * as mysqldb from "mysql2";
import config from "../config";

var pool = mysqldb.createPool({
  //host: config.db_config.host,
  user: config.db_config.user,
  password: config.db_config.password,
  database: config.db_config.db,
});

exports.pool = pool;
