import mssql from 'mssql'
import connectToAzure from "../config/dbConnecting.js";

class User {
  static async findByEmail(email) {
    const pool = await connectToAzure();
    const result = await pool
      .request()
      .input("email", mssql.NVarChar, email)
      .query("SELECT id FROM Users WHERE email = @email");

    return result.recordset[0]; // Вернет пользователя или undefined
  }

  static async create({ f_name, l_name, email, password, phone, role }) {
    const pool = await connectToAzure();
    await pool
      .request()
      .input("f_name", mssql.NVarChar, f_name)
      .input("l_name", mssql.NVarChar, l_name)
      .input("email", mssql.NVarChar, email)
      .input("password", mssql.NVarChar, password)
      .input("phone", mssql.NVarChar, phone)
      .input("role", mssql.NVarChar, role)
      .query(
        "INSERT INTO Users (f_name, l_name, email, password, phone, role) VALUES (@f_name, @l_name, @email, @password, @phone, @role)"
      );
  }
}

export default User;
