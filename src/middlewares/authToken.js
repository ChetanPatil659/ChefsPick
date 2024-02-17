import jwt from "jsonwebtoken";

export const generateAccessToken = (email) => {
    return jwt.sign(
        {
            email: email,
            isLoggedIn: true,
            // id: user.id,
        },
        '3f3b3eb298ba83e1c438b535f46fa960c1d73521d224ab718f092886985e232f',
        {
            expiresIn: "1h",
        }
    );
};

export const getAuthToken = async (req, res) => {
    const user = req["user"];
    const accessToken = generateAccessToken(user);
    
};