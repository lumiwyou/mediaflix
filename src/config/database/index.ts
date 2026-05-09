import mysql from "mysql"
import dotenv from "dotenv"
import config from "../../../settings.json" with { type: 'json' }

dotenv.config({ path: config.environment_path })

export const database = mysql.createConnection({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
});

export default database