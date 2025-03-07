import connectToAzure from "../config/dbConnecting.js";

export const getAllEvents = async () => {
  const pool = await connectToAzure();

  const result = await pool
    .request()
    .query(
      "SELECT e.title, l.venue, e.price, e.image, e.event_date FROM Events e JOIN Locations l ON e.location_id = l.id "
    );
  return result.recordset;
};

export const getSortedEvents = async (categoryId) => {
  let query = `
    SELECT e.title, c.name as category_event, l.venue, c.name, e.price, e.image, e.event_date 
    FROM Events e 
    JOIN Locations l ON e.location_id = l.id 
    JOIN Categories c ON e.category_id = c.id
    WHERE c.id = @categoryId
    ORDER BY e.event_date ASC;
  `;

  const pool = await connectToAzure();
  const request = pool.request();
  request.input("categoryId", categoryId); // Безопасная передача параметра

  const result = await request.query(query);
  return result.recordset;
};
