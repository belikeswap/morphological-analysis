import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env' });

const sql = neon(process.env.PRIVATE_SQL_DB_URL!);
export const db = drizzle(sql);
