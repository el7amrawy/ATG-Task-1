import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DB_URL } = process.env;

const client: pg.Pool = new pg.Pool({ connectionString: DB_URL });

export default client;
