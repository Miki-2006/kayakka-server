import Event from "../models/addEventModels.js";
import { imageToStorage } from "./imageToBlobStorage.js";
import {v4 as uuidv4} from 'uuid'
import path from 'path'

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

    let nameOfImage = null;
    if (req.file) {
      const fileBuffer = req.file.buffer;
      const nameOfImageToStorage = uuidv4(); 
      let extension = path.extname(req.file.originalname).toLowerCase();
      if (!extension) {
        console.log('No extension detected, defaulting to .jpg');
        extension = '.jpg'; // Пример дефолтного расширения
      }
      const name = await imageToStorage(nameOfImageToStorage, fileBuffer);    
      nameOfImage = name + extension 
    }

    const result = await Event.create({
      title,
      description,
      event_date,
      event_time,
      category,
      location,
      organizer,
      price,
      nameOfImage,
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
