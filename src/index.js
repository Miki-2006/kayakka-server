import app from './app.js'
import http from 'http'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT;
console.log(process.env.PORT);

// Создаём сервер
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});