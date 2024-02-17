import { Router } from "express";
import otpGenerator from 'otp-generator';
import mail from "../mailTemplate/otpMail.js";
import User from "../models/UserModel.js";
import OtpModel from "../models/OtpModel.js";
import { generateAccessToken, getAuthToken } from "../middlewares/authToken.js";

const router = Router()

router.post(
    '/send-otp',
    async (req, res, next) => {
        const { email, firstName } = req.body
        if (!email) res.send({ error: 'Please provide all the required fields' })

        try {
            var otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            var cDate = new Date()
            const otpData = await OtpModel.findOne({ userEmail: email })
            if (!otpData) {
                const newOtpData = await OtpModel.create({
                    otp: otp,
                    userEmail: email
                })
                mail(otp, email, firstName)
                res.status(201).json({ success: true, message: 'otp sent to' + email })
            } else {
                const updateOtpData = await OtpModel.findOneAndUpdate({ userEmail: email }, { otp: otp, timestamps: new Date(cDate.getTime()) })
                mail(otp, email, firstName)
                res.status(201).json({ success: true, message: 'otp update and sent to ' + email })
            }
            
        } catch (error) {
            res.status(500).json({ success: false, message: error })
        }
    }

)

router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body
    if (!email || !otp) res.send('send all fields')

    try {

        const otpData = await OtpModel.findOne({ userEmail: email })
        const user = await User.findOne({ email: email })
        if (!otpData) res.status(401).json({ error: 'Internal server error' })

        if (otp == otpData.otp) {
            if (!user) {
                const accessToken = generateAccessToken(email)
                
                const newUser = await User.create({
                    email: email,
                    accessToken: accessToken
                })
                res.status(201).json({ success: true, message: 'user created and logged in', user: newUser })
            }
            
            const updateUser = await User.findOneAndUpdate({email: email}, {accessToken: generateAccessToken(email)})
            res.status(201).json({ success: true, message: 'user updated and loged in', user: updateUser })
        }
        
        res.status(401).json({ success: false, message: 'wrong otp' })

    } catch (error) {
        Error(error)
    }

})

router.patch('/', async(req,res)=>{
    const { email, firstName, lastName, imageUrl } = req.body

    const user = await User.findOneAndUpdate({email: email}, {
        firstName : firstName || "",
        lastName : lastName || "",
        imageUrl : imageUrl || "",
    })

    res.status(200).json({ message: 'user updated' })

})

router.delete('/', async(req, res)=>{
    const { email } = req.body

    await User.findOneAndDelete({email: email})
    await OtpModel.findOneAndDelete({userEmail: email})

    res.status(200).json({message: 'user deleted'})
})

export default router