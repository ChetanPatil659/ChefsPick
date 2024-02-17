import { Router } from "express";
import recipeRouter from "./recipesRoute.js";
import authRouter from './authRoute.js'

const router = Router()

router.use('/recipes', recipeRouter)
router.use('/auth', authRouter)

export default router