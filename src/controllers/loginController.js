import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUserByEmail } from '../models/loginModels.js';

// Вход пользователя
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Получаем пользователя из базы данных
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Проверяем пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Генерация JWT
    const payload = {
      userId: user.id, // Используем id пользователя, полученное из базы данных
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });

    res.json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export default loginUser
