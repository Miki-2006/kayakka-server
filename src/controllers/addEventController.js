import Event from "../models/addEventModels.js";

export const addEvent = async (req, res) => {
  try {
    const { title, description, event_date, event_time, category, price } =
      req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля" });
    }

    let location = req.body.location;
    let organizer = req.body.organizer;

    try {
      location = location ? JSON.parse(location) : null;
      organizer = organizer ? JSON.parse(organizer) : null;
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Ошибка при разборе JSON-данных" });
    }

    const image = req.file ? req.file.buffer.toString("base64") : null; // Преобразуем файл в base64

    const result = await Event.create({
      title,
      description,
      event_date,
      event_time,
      category,
      location,
      organizer,
      price,
      image,
    });

    if (result.success) {
      res
        .status(201)
        .json({ message: "Мероприятие добавлено!", event_id: result.event_id });
    } else {
      res.status(500).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при добавлении мероприятия" });
  }
};
