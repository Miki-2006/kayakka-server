import express from 'express'
import eventRoutes from './eventRoutes.js'
import categoryRoutes from './categoryRoutes.js'
import authRoutes from './authRoutes.js'

const router = express.Router()

router.use('/events', eventRoutes)
router.use('/category', categoryRoutes)
router.use('/auth', authRoutes)

export default router