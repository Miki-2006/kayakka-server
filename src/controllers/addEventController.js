import Event from '../models/addEventModels.js'

export const addEvent = async (req, res) => {
  try {
    const { title, description, event_date, location_id, category_id, organizer_id, price, image } = req.body;

    // Проверяем, существуют ли локация и категория
    const category = await Event.findCategory(category_id);

    if (!category) {
      return res.status(400).json({ error: "Категория не найдены" });
    }

    // Создаем мероприятие
    await Event.create({ title, description, event_date, location_id, category_id, organizer_id, price, image });

    res.json({ message: "Мероприятие добавлено!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при добавлении мероприятия" });
  }
};

