import nodemailer from "nodemailer"

const mail = (otp, email, firstName) => {

    try {
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'patilchetan659@gmail.com',
                pass: 'etrwvurnxynrrgxc'
            }
        })
    
        const mailOptions = {
            from: 'patilchetan659@gmail.com',
            to: email,
            subject: `OTP Verification for Chef's Pick App`,
            text: `Dear ${firstName},\n\nThank you for choosing Chef's Pick! To ensure the security of your account, we require you to verify your email address.\n\n Your One-Time Password (OTP) is: ${otp}\n\nPlease enter this code in the app to complete the verification process. This code will expire in [expiry_time_minutes] minutes for security purposes.\nIf you did not request this OTP, please ignore this email. Someone might have entered your email address by mistake.\n\nThank you for using Chef's Pick.\nBest Regards,\nChef's Pick Team`
        }
    
        transporter.sendMail(mailOptions, (err,info)=>{
            if(err){
                console.log(err)
                return info.messageId
            }else{
                console.log(info.messageId)
            }
        })
    } catch (error) {
        console.log(error)
    }
}



export default mail