import { getAllCinemas, getHallsOfCinemas } from "../models/cinemaModels.js";

export const getCinemas = async (req, res) => {
  try {
    const cinemas = await getAllCinemas();
    res.status(200).json(cinemas);
  } catch (err) {
    console.error("Ошибка при обработке запроса:", err);
    res.status(500).json({ message: "Ошибка сервера", err });
  }
};

export const getHalls = async (req, res) => {
  try {
    const { selectedCinemaId } = req.query;
    const halls = await getHallsOfCinemas(selectedCinemaId);
    res.status(200).json(halls);
  } catch (err) {
    console.error("Ошибка при обработке запроса:", err);
    res.status(500).json({ message: "Ошибка сервера", err });
  }
};
