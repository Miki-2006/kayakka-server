import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'


const app = express()


app.use(express.json())
app.use(cors({origin: '*'}))
app.use(express.urlencoded({extended: true}))


app.use("/api", routes)

app.get('/', (req, res) => {
    res.send('Сервер работает! API доступен по https://kayakka-server-acbhlax8d-mirlans-projects.vercel.app//api/events');
});


export default app