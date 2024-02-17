import axios from "axios"
import Recipe from "../models/RecipeModel.js"

export const getRecipesByIdUtil = async (id) => {
    const recipeFromSpoonacular = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=b838def71b9543eea1c63d3d5fe3218a`)
    const response = recipeFromSpoonacular.data

    const temp = await Recipe.findOne({ id: id })
    
    if (!temp) {
        const recipe = Recipe.create({
            vegetarian: response.vegetarian,
            vegan: response.vegan,
            sourceName: response.sourceName,
            extendedIngredients: [
                ...response.extendedIngredients
            ],
            id: response.id,
            title: response.title,
            servings: response.servings,
            image: response.image,
            cuisines: response.cuisines,
            dishTypes: [...response.dishTypes],
            diets: [...response.diets],
            occasions: [...response.occasions],
            analyzedInstructions: [
                ...response.analyzedInstructions
            ],
            spoonacularScore: response.spoonacularScore
        })
    }

    return response
}