import { Router } from "express";
import { getRecipesById, getRecipesByQuery } from "../controllers/recipesController.js";
 
const router = Router()

router.get('/:id', getRecipesById)
router.get('/search/:query', getRecipesByQuery)

export default router