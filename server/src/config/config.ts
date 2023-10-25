require("dotenv").config({ path: __dirname + "/../../.env" });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 4200,
  db: {
    url:
      process.env.NODE_ENV === "TEST"
        ? "mongodb://localhost:27017/burbn" : process.env.MONGO_URL,
    password: process.env.DB_PASSWORD,
  },
};

export default config;