import axios from 'axios'
import Recipe from '../models/RecipeModel.js'
import { getRecipesByIdUtil } from '../utils/getRecipes.js'

export const getRecipesById = async (req, res) => {
    const id = req.params.id
    console.log(id)
    if (!id) res.send('no recipe id provided')

    try {
        const recicpeFromDatabase = await Recipe.findOne({ id: id })
        if (recicpeFromDatabase) {
            res.send({
                data: recicpeFromDatabase,
                from: 'get recipe by id in database'
            })
        } else {
            const response = getRecipesByIdUtil(id)
            if (!response) res.send({ error: 'something went wrong' })

            console.log(response.image)

            res.send({
                data: response,
                from: 'get recipe by id by spoonacular'
            })
        }

    } catch (error) {
        console.error(error)
        res.json({ error: error + 'catch error' })
    }
}

export const getRecipesByQuery = async(req,res)=>{
    const {query} = req.params
    if (!query) res.send('no recipe query provided')


    try {
        const recicpeFromDatabase = await Recipe.find( { title : { '$regex' : query, '$options': 'i'} } )
        if(recicpeFromDatabase.length != 0){
            res.send({ data: recicpeFromDatabase, from: 'database' })

        }else{
            const recipeFromSpoonacular = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=b838def71b9543eea1c63d3d5fe3218a`)
            const response = recipeFromSpoonacular.data.results

            response.forEach((data)=> getRecipesByIdUtil(data.id))
            res.send({ data: response, from: 'spoonacular'})
        }
    } catch (error) {
        console.error(error)
        res.json({ error: error + 'catch error' })
    }
}