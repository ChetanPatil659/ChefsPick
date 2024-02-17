import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    otp:{
        type: Number,
        required: true,
    },
    userEmail:{
        type: String,
        required: true,
        unique: true
    },
    timestamps: {
        type: Date,
        default: Date.now,
        get : (timestamps) => timestamps.getTime(),
        set: (timestamps) => new Date(timestamps)
    }
})

export default mongoose.model('Otps', OtpSchema)