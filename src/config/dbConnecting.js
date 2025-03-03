import mssql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()





const config = {
  user: process.env.USER_MSSQL,
  server: process.env.SERVER_MSSQL,
  database: process.env.DATABASE_MSSQL,
  password: process.env.PASSWORD_MSSQL,
  options: {
    trustServerCertificate: false,
    encrypt: true,
  },
};

const connectToAzure = async () => {
  try {

    const poolConnection = await mssql.connect(config);

    console.log("Успешное подключение к Azure SQL!");
    return poolConnection
  } catch (err) {
    console.error("❌ Ошибка подключения к базе данных:", err);
  }
};

export default connectToAzure;

