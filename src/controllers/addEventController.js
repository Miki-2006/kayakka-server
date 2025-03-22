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

    const parsedLocation = JSON.parse(location);
    const parsedOrganizer = JSON.parse(organizer);

    // Создаём событие с обработкой всех данных
    const result = await Event.create({
      title,
      description,
      event_date,
      event_time,
      category,
      parsedLocation,
      parsedOrganizer,
      price,
      image,
    });

    res.json({
      message: "Мероприятие добавлено!",
      event: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при добавлении мероприятия" });
  }
};
