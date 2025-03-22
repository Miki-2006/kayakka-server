import connectToAzure from "../config/dbConnecting";

export const getUserByEmail = async (email) => {
  const pool = await connectToAzure();
  try {
    const result = await pool.query`SELECT * FROM Users WHERE email = ${email}`;
    return result.recordset[0]; // Возвращаем первый найденный результат
  } catch (err) {
    console.error('Error fetching user by email:', err.message);
    throw err;
  }
};


