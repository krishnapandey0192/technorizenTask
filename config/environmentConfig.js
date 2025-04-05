import { configDotenv } from "dotenv";
configDotenv();

const NODE_ENV = process.env.Node_ENV;

export const environmentConfig = {
  dbHost:
    NODE_ENV === "DEVELOPMENT"
      ? process.env.DEV_DB_URI
      : process.env.PRD_DB_URI,

  port:
    NODE_ENV === "DEVELOPMENT"
      ? process.env.DEV_DB_PORT
      : process.env.PRD_DB_PORT,

  jwtSecret:
    NODE_ENV === "DEVELOPMENT"
      ? process.env.DEV_JWT_SECRET
      : process.env.PRD_JWT_SECRET,

    adminEmail:
      NODE_ENV === "DEVELOPMENT"
        ? process.env.ADMIN_EMAIL
        : process.env.ADMIN_EMAIL,

    adminPassword:
      NODE_ENV === "DEVELOPMENT"
        ? process.env.ADMIN_PASSWORD
        : process.env.ADMIN_PASSWORD,
};
