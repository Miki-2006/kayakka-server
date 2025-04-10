import express from 'express'
import { getImage } from '../controllers/getImageFromBlobStorage.js'

const router = express.Router()

router.get('/:filename', getImage)

export default router