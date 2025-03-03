import connectToAzure from "../config/dbConnecting.js";

export const getAllCategories = async () => {
  const pool = await connectToAzure();

  const result = await pool.request().query("SELECT * FROM Categories");
  return result.recordset;
};
