
import User from "../modals/authModal.js";
import tokeGenerator from "../utils/tokenGenerator.js";

export const signup = async (req, res) => {
    try {
        console.log("sigup is running")
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json(
                {
                    "success": false,
                    "message": "Name,Email and Password is required !!"
                }
            )
        }

        let userdata = await User.findOne({ email });
        if (userdata) return res.status(400).json({ "success": false, message: "Email already is used!!" });

        const user = new User({ fullname, email, password });
        await user.save().then(() => {
            console.log("Data have been saved")
        }).catch((e) => {
            console.log("Error while signup", e)
        })

        const token = tokeGenerator({ email, password });
        const userSavedData = await User.findOne({email})
        return res.status(200).json(
            {
                "success": true,
                "message": "Your are register succesfully",
                "token": token,
                "data" : userSavedData
            }
        )
    }
    catch (e) {
        console.log(e);
        res.json({ "message": "error", e })
    }
}



// login controller 
export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(
                {
                    "success": false,
                    "message": "Name,Email and Password is required !!"
                }
            )
        }
        console.log("Email = ", email)

        console.log("Password = ", password)



        const user1 = await User.findOne({ email });

        if(!user1) return res.json({message:"user does not exists please register"})
        console.log(user1);
        console.log("sddsfdffs",user1.password)
      

        if (!user1) return res.status(404).json({ success: false, message: "aap dbms me nahi hai" })
        if (password != user1.password) return res.status(400).json({
            success: false,
            message: "Password Galat hai sahi enter karo "

        })

        const token = tokeGenerator({ email, password });

        return res.status(200).json(
            {
                success: true,
                message: "Your are login succesfully",
                data: { token: token, logindata:user1 }
            }
        )
    } catch (e) {
        console.log(e)
        res.json({ error: e.message });
    }



}