import express from 'express'
import eventRoutes from './eventRoutes.js'
import categoryRoutes from './categoryRoutes.js'
import authRoutes from './authRoutes.js'
import imageRoutes from './imageRoutes.js'

const router = express.Router()

router.use('/events', eventRoutes)
router.use('/category', categoryRoutes)
router.use('/auth', authRoutes)
router.use('/images', imageRoutes)

export default router