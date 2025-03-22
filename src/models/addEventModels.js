import mssql from 'mssql';
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
    const transaction = new mssql.Transaction(pool);

    try {
      await transaction.begin();

      // 1. Объединяем дату и время в формат DATETIME
      const fullDateTime = `${event_date} ${event_time}`;

      // 2. Работа с категорией
      let category_id;
      if (typeof category === "number") {
        category_id = category;
      } else {
        const categoryResult = await transaction.request()
          .input('name', mssql.NVarChar, category)
          .query("INSERT INTO Categories (name) VALUES (@name); SELECT SCOPE_IDENTITY() AS id");

        category_id = categoryResult.recordset[0].id;
      }

      // 3. Вставка местоположения
      const locationResult = await transaction.request()
        .input('venue', mssql.NVarChar, location.venue)
        .input('max_attendees', mssql.Int, location.max_attendees)
        .input('address', mssql.NVarChar, location.address)
        .query("INSERT INTO Locations (venue, max_attendees, address) VALUES (@venue, @max_attendees, @address); SELECT SCOPE_IDENTITY() AS id");

      const location_id = locationResult.recordset[0].id;

      // 4. Вставка организатора
      const organizerResult = await transaction.request()
        .input('organization_name', mssql.NVarChar, organizer.organization_name)
        .input('website', mssql.NVarChar, organizer.website)
        .input('user_id', mssql.Int, organizer.user_id)
        .query("INSERT INTO Organizers (organization_name, website, user_id) VALUES (@organization_name, @website, @user_id); SELECT SCOPE_IDENTITY() AS id");

      const organizer_id = organizerResult.recordset[0].id;

      // 5. Вставка мероприятия
      await transaction.request()
        .input('title', mssql.NVarChar, title)
        .input('description', mssql.NVarChar, description)
        .input('event_date', mssql.DateTime, fullDateTime)
        .input('location_id', mssql.Int, location_id)
        .input('category_id', mssql.Int, category_id)
        .input('organizer_id', mssql.Int, organizer_id)
        .input('price', mssql.Decimal(18, 2), price)
        .input('image', mssql.NVarChar, image)
        .query(
          `INSERT INTO Events (title, description, event_date, location_id, category_id, organizer_id, price, image) 
           VALUES (@title, @description, @event_date, @location_id, @category_id, @organizer_id, @price, @image)`
        );

      // Подтверждение транзакции
      await transaction.commit();
      return { success: true, message: "Мероприятие успешно создано!" };
    } catch (error) {
      // Откат транзакции в случае ошибки
      await transaction.rollback();
      console.error(error);
      return { success: false, message: error.message };
    }
  }
}

export default Event;
