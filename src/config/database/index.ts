import mysql from "mysql"
import config from "../../../settings.json"

export const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "admin",
  password: "password"
});

export default connection