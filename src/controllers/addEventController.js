import Event from "../models/addEventModels.js";

export const addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      event_date,
      event_time,
      category,
      location,
      organizer,
      price,
      image,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    let parsedLocation = null;
    let parsedOrganizer = null;

    try {
      parsedLocation = location ? JSON.parse(location) : null;
      parsedOrganizer = organizer ? JSON.parse(organizer) : null;
    } catch (err) {
      return res.status(400).json({ message: "Ошибка при разборе данных" });
    }

    // Создаём событие с обработкой всех данных
    const result = await Event.create({
      title,
      description,
      event_date,
      event_time,
      category,
      location: parsedLocation,
      organizer: parsedOrganizer,
      price,
      image,
    });

    res.json({
      message: "Мероприятие добавлено!",
      event: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при добавлении мероприятия" });
  }
};
