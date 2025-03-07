import express from 'express'
import { getEvents, getQueryEvents } from '../controllers/eventController.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/sort', getQueryEvents)

export default router