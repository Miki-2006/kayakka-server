import connectToAzure from "../config/dbConnecting.js";
const pool = await connectToAzure();

class Event {
  static async create({
    title,
    description,
    event_date,
    event_time,
    category,
    location,
    organizer,
    price,
    image,
  }) {
    try {
      await pool.beginTransaction();

      // 1. Объединяем дату и время в формат DATETIME
      const fullDateTime = `${event_date} ${event_time}`;

      // 2. Работа с категорией
      let category_id;
      if (typeof category === "number") {
        category_id = category;
      } else {
        const [categoryResult] = await pool.query(
          "INSERT INTO Categories (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)",
          [category]
        );
        category_id = categoryResult.insertId;
      }

      // 3. Вставка местоположения
      const [locationResult] = await pool.query(
        "INSERT INTO Locations (venue, max_attendees, address) VALUES (?, ?, ?)",
        [location.venue, location.max_attendees, location.address]
      );
      const location_id = locationResult.insertId;

      // 4. Вставка организатора
      const [organizerResult] = await pool.query(
        "INSERT INTO Organizers (organization_name, website, user_id) VALUES (?, ?, ?)",
        [organizer.organization_name, organizer.website, organizer.user_id]
      );
      const organizer_id = organizerResult.insertId;

      // 5. Вставка мероприятия
      await pool.query(
        `INSERT INTO Events (title, description, event_date, location_id, category_id, organizer_id, price, image) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title,
          description,
          fullDateTime,
          location_id,
          category_id,
          organizer_id,
          price,
          image,
        ]
      );

      await pool.commit();
      return { success: true, message: "Мероприятие успешно создана!" };
    } catch (error) {
      await pool.rollback();
      return { success: false, message: error };
    }
  }
}

export default Event;
