import express from 'express'
import { getEvents, getOneEvent, getQueryEvents } from '../controllers/eventController.js'
import {addEvent} from '../controllers/addEventController.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/sort', getQueryEvents)
router.get('/card', getOneEvent)
router.get('/add', addEvent)

export default router