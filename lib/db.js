import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: process.env.SERVER,
  database: process.env.DATABASE,
  driver: 'SQL Server',
  user: process.env.USER,
  password: process.env.PASSWORD,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    requestTimeout: 60000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let poolPromise;

export async function getDBConnection() {
  if (!poolPromise) {
    console.log(' Creating a new SQL connection pool...');
    poolPromise = sql.connect(config)
      .then((pool) => {
        console.log('Connected to SQL Server');
        return pool;
      })
      .catch((err) => {
        console.error('Database Connection Failed:', err);
        poolPromise = null; 
        throw err;
      });
  }
  return poolPromise;
}

export { sql };
