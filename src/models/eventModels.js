import connectToAzure from "../config/dbConnecting.js";

export const getAllEvents = async () => {
  const pool = await connectToAzure();

  const result = await pool
    .request()
    .query(
      "SELECT e.title, l.venue, e.price, e.image, e.event_date FROM Events e JOIN Locations l ON e.location_id = l.id ORDER BY e.event_date ASC"
    );
  return result.recordset;
};

export const getSortedEvents = async (categoryId) => {
  let query = `
    SELECT e.title, c.name as category_event, l.venue, e.price, e.image, e.event_date 
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

export const getEvent = async (eventId) => {
  let query = `
    SELECT e.title, e.description, e.price, e.image, e.event_date, 
    c.name as category_event, 
    o.organization_name, o.website, 
    l.venue, l.max_attendees, l.address,
    u.phone as phoneOrganizer
      FROM Events e 
      JOIN Locations l ON e.location_id = l.id 
      JOIN Categories c ON e.category_id = c.id
	    JOIN Organizers o ON e.organizer_id = o.id
	    JOIN Users u ON o.user_id = u.id
      WHERE e.id = @eventId;
  `;

  const pool = await connectToAzure();
  const request = pool.request();
  request.input("eventId", eventId); // Безопасная передача параметра

  const result = await request.query(query);
  return result.recordset;
};
