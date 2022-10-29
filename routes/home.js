import express from 'express'
import { getHomeContent } from '../controllers/home.js'

const router = express.Router()

router.get('/', getHomeContent)

export default router