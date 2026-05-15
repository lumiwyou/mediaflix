import mysql from "mysql2"
import type { Connection, ConnectionOptions, Query } from "mysql2"
import dotenv from "dotenv"
import config from "../../../settings.json" with { type: 'json' }
import { randomUUID, randomBytes } from "node:crypto"

dotenv.config({ path: config.environment_path })

interface Database {

  connection: Connection | null;
  connect(): Promise<void>;
  disconnect(): void;
  query(exec: string): Promise<[any, any]>;
}

export const database: Database = {
  connection: null,

  async connect() {
    this.connection = await mysql.createConnection({
      host: process.env.PGHOST,
      port: process.env.PGPORT as unknown as number,
      user: process.env.PGUSER,
      password: process.env.PHPASSWORD,
      database: process.env.PGDATABASE
    } as ConnectionOptions)
  },

  disconnect() {
    this.connection?.end()
  },

  async query(exec: string) {
    const [rows, fields]: any = await this.connection?.query(exec)
    return [rows, fields]
  }
}

console.debug(`Database connection configuration:
  host: ${process.env.PGHOST}
  user: ${process.env.PGUSER}
  port: ${process.env.PGPORT}
  password: ${process.env.PGPASSWORD?.replaceAll(/./g, '*')}
  database: ${process.env.PGDATABASE}
  `)

  // TODO: Remove before production
export function bootstrapDatabase() {
  database.query(`
    CREATE TABLE users (
      userId VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      deletion BIT DEFAULT 0,
      locked BIT DEFAULT 0
    )`)
  database.query(`
    CREATE TABLE library (
      libraryId INT NOT NULL AUTO_INCREMENT DEFAULT 0,
      userId VARCHAR(255) NOT NULL,
      name VARCHAR(255) DEFAULT 'Your library'
    )`)
}

export function insertTestDatabase(users: number, libraries: number) {
  for(let u = 0; u < users; u++) {
    const userId: string = randomUUID()
    database.query(`
      INSERT INTO users (userId, email, password_hash, deletion, locked) VALUES '${userId}', '${randomBytes(5).toString()}@example.com', '${randomBytes(20).toString()}', 
      `)

    for(let l = 0; l < libraries; l++) {
      database.query(`
        INSERT INTO library (userId) VALUES '${userId}'
        `)
      }
    }
}

export default { database, bootstrapDatabase, insertTestDatabase }