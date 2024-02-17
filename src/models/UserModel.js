import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    accessToken: {
        type: String,
        unique: true
    },
    imageUrl: {
        type: String
    },
    bookmarkedRecipes:[
        {type: String}
    ],
    likedRecipes:[
        {type: String}
    ],
    createdAt:{
        type: Date,
        default: Date.now,
        get : (timestamps) => timestamps.getTime(),
        set: (timestamps) => new Date(timestamps)
    },
    updatedAt:{
        type: Date,
        default: Date.now,
        get : (timestamps) => timestamps.getTime(),
        set: (timestamps) => new Date(timestamps)
    },
    
})

export default mongoose.model('Users', UserSchema)