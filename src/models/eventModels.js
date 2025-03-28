import connectToAzure from "../config/dbConnecting.js";

export const getAllEvents = async () => {
  try {
    const pool = await connectToAzure();

    const result = await pool.request().query(`
        SELECT e.id, e.title, l.venue, e.price, e.image, e.event_date 
        FROM Events e 
        JOIN Locations l ON e.location_id = l.id 
        ORDER BY e.event_date ASC
      `);

    // Преобразуем HEX-строку в Base64
    const events = result.recordset.map((event) => ({
      ...event,
      image: event.image
        ? `data:image/png;base64,${Buffer.from(event.image, "hex").toString(
            "base64"
          )}`
        : null, // Если изображения нет, то null
    }));

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

export const getSortedEvents = async (categoryId) => {
  let query = `
    SELECT e.id, e.title, c.name as category_event, l.venue, e.price, e.image, e.event_date 
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
    SELECT e.id, e.title, e.description, e.price, e.image, e.event_date, 
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
