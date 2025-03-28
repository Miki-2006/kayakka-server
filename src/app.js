import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const app = express();
const corsOptions = {
  origin: ["https://kayakka-client.vercel.app","https://www.kayakka.com/"], // Разрешаем только этот источник
  methods: ["GET", "POST", "PUT", "DELETE"], // Разрешаем нужные методы
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
   // Разрешаем заголовки
};

app.use(express.json());
app.use(
  cors(corsOptions)
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send(
    "Сервер работает! API доступен по https://kayakka-server-acbhlax8d-mirlans-projects.vercel.app//api/events"
  );
});

export default app;
