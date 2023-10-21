require("dotenv").config({ path: __dirname + "/../../.env" });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 4200,
  db: {
    url:
      process.env.NODE_ENV === "TESTING_ENV"
        ? process.env.MONGO_URL
        : "mongodb://localhost:27017/burbn",
    password: process.env.DATABASE_PASSWORD,
  },
};

export default config;