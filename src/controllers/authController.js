import User from '../models/userModels'
import hashPassword from '../middlewares/hashPassword';

export const register = async (req, res) => {
  try {
    const { f_name, l_name, email, password, phone, role } = req.body;

    if (!f_name || !l_name || !email || !password || !phone || !role) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    if (!["user", "organizer"].includes(role)) {
      return res.status(400).json({ message: "Недопустимая роль" });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email уже зарегистрирован" });
    }

    const hashedPassword = await hashPassword(password);

    await User.create({ f_name, l_name, email, password: hashedPassword, phone, role });

    res.status(201).json({ message: "Пользователь зарегистрирован" });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

