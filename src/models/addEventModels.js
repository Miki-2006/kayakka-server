import mssql from "mssql";
import connectToAzure from "../config/dbConnecting.js";
import fs from "fs";

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
    image, // предполагаем, что image в формате base64
  }) {
    const transaction = new mssql.Transaction(pool);

    try {
      await transaction.begin();

      // 1. Объединяем дату и время в формат DATETIME
      const fullDateTime = `${event_date} ${event_time}`;

      // 3. Вставка местоположения
      const locationResult = await transaction
        .request()
        .input("venue", mssql.NVarChar, location.venue)
        .input("max_attendees", mssql.Int, location.max_attendees)
        .input("address", mssql.NVarChar, location.address)
        .query(
          "INSERT INTO Locations (venue, max_attendees, address) VALUES (@venue, @max_attendees, @address); SELECT SCOPE_IDENTITY() AS id"
        );

      if (!locationResult.recordset.length)
        throw new Error("Не удалось создать местоположение");
      const location_id = locationResult.recordset[0].id;

      // 4. Вставка организатора
      const organizerResult = await transaction
        .request()
        .input("organization_name", mssql.NVarChar, organizer.organization_name)
        .input("website", mssql.NVarChar, organizer.website)
        .input("user_id", mssql.Int, organizer.user_id)
        .query(
          "INSERT INTO Organizers (organization_name, website, user_id) VALUES (@organization_name, @website, @user_id); SELECT SCOPE_IDENTITY() AS id"
        );

      if (!organizerResult.recordset.length)
        throw new Error("Не удалось создать организатора");
      const organizer_id = organizerResult.recordset[0].id;

      // 5. Обработка изображения (если есть)
      let imageBinary = null;
      if (image) {
        // Читаем изображение в виде буфера
        const imageBuffer = fs.readFileSync(image);

        // Преобразуем буфер в строку Base64
        const base64Image = imageBuffer.toString("base64");

        // Преобразуем Base64 обратно в бинарный формат
        const binaryBuffer = Buffer.from(base64Image, "base64");

        // Преобразуем бинарный формат в HEX (если нужно)
        const hexImage = "0x" + binaryBuffer.toString("hex").toUpperCase();
        imageBinary = hexImage
      }

      // 6. Вставка мероприятия
      const eventResult = await transaction
        .request()
        .input("title", mssql.NVarChar, title)
        .input("description", mssql.NVarChar, description)
        .input("event_date", mssql.DateTime, fullDateTime)
        .input("location_id", mssql.Int, location_id)
        .input("category_id", mssql.Int, category)
        .input("organizer_id", mssql.Int, organizer_id)
        .input("price", mssql.Decimal(10, 0), price)
        .input("image", mssql.VarBinary, imageBinary) // сохраняем бинарный формат изображения
        .query(
          `INSERT INTO Events (title, description, event_date, location_id, category_id, organizer_id, price, image) 
           VALUES (@title, @description, @event_date, @location_id, @category_id, @organizer_id, @price, @image)`
        );
      if (eventResult.rowsAffected[0] === 0)
        throw new Error("Не удалось создать мероприятие");

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
