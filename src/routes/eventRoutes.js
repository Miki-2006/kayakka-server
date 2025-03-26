import express from 'express'
import { getEvents, getOneEvent, getQueryEvents } from '../controllers/eventController.js'
import upload from '../config/multer.js'
import { addEvent } from '../controllers/addEventController.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/sort', getQueryEvents)
router.get('/card', getOneEvent)
router.post('/adding', upload.single("image"), addEvent)

export default router