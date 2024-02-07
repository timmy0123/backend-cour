require("dotenv").config();

export default {
  db_config: {
    host: process.env.DB_HOST as string,
    db: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    port: process.env.DB_PORT as string,
  },
  url_config: {
    url: process.env.URL as string,
  },
};
