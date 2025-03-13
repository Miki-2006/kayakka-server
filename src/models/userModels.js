import connectToAzure from "../config/dbConnecting.js";

class User {
  static async findByEmail(email) {
    const pool = await connectToAzure();
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT id FROM Users WHERE email = @email");

    return result.recordset[0]; // Вернет пользователя или undefined
  }

  static async create({ f_name, l_name, email, password, phone, role }) {
    const pool = await connectToAzure();
    await pool
      .request()
      .input("f_name", sql.NVarChar, f_name)
      .input("l_name", sql.NVarChar, l_name)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .input("phone", sql.NVarChar, phone)
      .input("role", sql.NVarChar, role)
      .query(
        "INSERT INTO Users (f_name, l_name, email, password, phone, role) VALUES (@f_name, @l_name, @email, @password, @phone, @role)"
      );
  }
}

export default User;
