import mssql from 'mssql'

export const getUserByEmail = async (email) => {
  try {
    const result = await mssql.query`SELECT * FROM Users WHERE email = ${email}`;
    return result.recordset[0]; // Возвращаем первый найденный результат
  } catch (err) {
    console.error('Error fetching user by email:', err.message);
    throw err;
  }
};


