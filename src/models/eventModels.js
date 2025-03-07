import connectToAzure from "../config/dbConnecting.js";

export const getAllEvents = async () => {
  const pool = await connectToAzure();

  const result = await pool
    .request()
    .query(
      "SELECT e.title, l.venue, e.price, e.image, e.event_date FROM Events e JOIN Locations l ON e.location_id = l.id"
    );
  return result.recordset;
};
