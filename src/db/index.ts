import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connection_string
})

export const initDB = async () => {
    try {

        await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(40),
        email VARCHAR(40) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
        await pool.query(`
            ALTER TABLE users
            ALTER COLUMN email TYPE VARCHAR(40)
            `)
        await pool.query(`
            ALTER TABLE users
            ALTER COLUMN name TYPE VARCHAR(40)
            `)

        console.log("Database connected successfully")

    } catch (error) {
        console.log(error)
    }
}