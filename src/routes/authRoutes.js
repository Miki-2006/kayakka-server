import express from 'express'
import { register } from '../controllers/authController.js'
import User from '../models/userModels.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', register)
router.get('/auto-login', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Не зарегистрированы' });
  
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Не правильный токен' });
  
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  
      res.json({ message: 'Авто вход успешно закончен', user });
    });
  });
  

export default router