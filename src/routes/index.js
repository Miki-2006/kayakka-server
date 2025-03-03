import express from 'express'
import eventRoutes from './eventRoutes.js'
import categoryRoutes from './categoryRoutes.js'

const router = express.Router()

router.use('/events', eventRoutes)
router.use('/category', categoryRoutes)

export default router