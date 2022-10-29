import User from "../models/User.js"

export const userRegister = async (req, res) => {
    try {
        const user = new User({
            name: "nhunghoang",
            nick_name: "hanahhh",
            email: "hoangnhung25122001@gmail.com",
            password: "1234567890",
            description: "sunshine, butter, daisy, mellow",
            education: "Hanoi University of Science and Technology",
            website: "https://hanahhh.netlify.app/",
            educationStatus: 1,
        })
    
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}