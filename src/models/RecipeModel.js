import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({

    vegetarian:{
        type: Boolean
    },

    vegan:{
        type: Boolean
    },

    sourceName:{
        type:String
    },

    extendedIngredients:[
        {
            type: Object
        }
    ],

    id: {
        type: Number,
        // required: true
    },

    title: {
        type: String,
        // required: true
    },

    servings: {
        type: Number,
        // required: true
    },

    image:{
        type: String,
        // required: true
    },

    cuisines:[
        { type: String }
    ],

    dishTypes:[
        { type: String }
    ],

    diets:[
        { type: String }
    ],

    occasions:[
        { type: String }
    ],

    analyzedInstructions:[
        {
            type: Object
        }
    ],

    spoonacularScore:{
        type: Number
    },

    likes:{
        type: Number,
        default: 0
    }
})

export default mongoose.model('Recipes', RecipeSchema)