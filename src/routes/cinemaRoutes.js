import express from "express";
import { getCinemas, getHalls } from '../controllers/cinemaController.js'

const router = express.Router();

router.get('/', getCinemas)
router.get('/halls', getHalls)

export default router