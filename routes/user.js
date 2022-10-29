import express from 'express'
import { userRegister } from '../controllers/user.js'
const router = express.Router()

//REGISTER
router.post('/', userRegister)

export default router