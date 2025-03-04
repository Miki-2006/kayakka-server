import connectToAzure from "../config/dbConnecting.js";

export const getAllEvents = async () => {
  const pool = await connectToAzure();

  const result = await pool.request().query("SELECT title, description, price, image, event_date FROM Events");
  return result.recordset;
};

