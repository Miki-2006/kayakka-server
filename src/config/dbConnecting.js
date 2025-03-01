import mssql from 'mssql'
import { DefaultAzureCredential } from '@azure/identity'
import dotenv from 'dotenv'

dotenv.config()

console.log('SERVER_MSSQL:', process.env.SERVER_MSSQL);



const credential = new DefaultAzureCredential();

const config = {
  server: process.env.SERVER_MSSQL,
  database: process.env.DATABASE_MSSQL,
  authentication: {
    type: "azure-active-directory-access-token",
  },
  options: {
    trustServerCertificate: false,
    encrypt: true,
  },
};

const connectToAzure = async () => {
  try {
    const tokenResponse = await credential.getToken(
      "https://database.windows.net/.default"
    );
    if (!tokenResponse || !tokenResponse.token) {
      throw new Error("Ошибка получения токена доступа!");
    }

    config.authentication.options = {
        token: tokenResponse.token
    }

    const poolConnection = await mssql.connect(config);

    console.log("Успешное подключение к Azure SQL!");
    return poolConnection
  } catch (err) {
    console.error('здесь',err);
  }
};

export default connectToAzure;

