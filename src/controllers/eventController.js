import { getAllEvents, getSortedEvents } from "../models/eventModels.js";

export const getEvents = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    console.error("Ошибка при обработке запроса:", err);
    res.status(500).json({ message: "Ошибка сервера", err });
  }
};

export const getQueryEvents = async (req, res) => {
  try {
    const { categoryId } = req.query;
    if (!category) {
      return res.status(400).json({ error: "Требуется параметр category" });
    }
    const events = await getSortedEvents(categoryId);
    res.status(200).json(events);
  } catch (err) {
    console.error("Ошибка при обработке запроса:", err);
    res.status(500).json({ message: "Ошибка сервера", err });
  }
};
