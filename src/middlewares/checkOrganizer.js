import Organizer from '../models/checkOrganizerModels.js'

export const verifyOrganizer = async (req, res, next) => {
  try {
    const { organizer_id } = req.body;
    const organizer = await Organizer.isOrganizer(organizer_id);

    if (!organizer) {
      return res.status(403).json({ error: "Доступ запрещен: пользователь не является организатором" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Ошибка проверки организатора" });
  }
};


