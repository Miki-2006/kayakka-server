import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'
import hashPassword from '../middlewares/hashPassword.js';

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
    
    const newUser = await User.create({ f_name, l_name, email, password: hashedPassword, phone, role });
    

    const token = jwt.sign({userId: newUser.id}, process.env.SECRET_KEY, {expiresIn: '7d'})

    res.cookie('token', token, {httpOnly: false, sameSite: "None",secure: false, maxAge: 7 * 24 * 60 * 60 * 1000})
    res.status(201).json({ message: "Пользователь зарегистрирован" });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

