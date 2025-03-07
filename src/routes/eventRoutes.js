import express from 'express'
import { getEvents, getOneEvent, getQueryEvents } from '../controllers/eventController.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/sort', getQueryEvents)
router.get('/card', getOneEvent)

export default router