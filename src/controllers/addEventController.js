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

    // Создаём событие с обработкой всех данных
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

    res.json({ message: "Мероприятие добавлено!", event: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при добавлении мероприятия" });
  }
};
