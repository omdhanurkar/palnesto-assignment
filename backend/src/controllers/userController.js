const userModel = require("../models/userModel")
const check = require("../utils/validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


//=====================================CREATE USER===============================================================

const createUser = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
         if (!check.isValidRequestBody(data)) { return res.status(400).send({ status: false, message: "Please enter data to create user" }) }

        let { name, email, password } = data


        if (!name) { return res.status(400).send({ status: false, message: "Lname is mandatory" }) };
        if (!check.isValidname(name)) { return res.status(400).send({ status: false, message: "name should be in Alphabets" }) };

        if (!email) { return res.status(400).send({ status: false, message: "email is mandatory" }) };
        if (!check.isVAlidEmail(email)) { return res.status(400).send({ status: false, message: "Email should be valid" }) };
        let checkEmail = await userModel.findOne({ email });
        if (checkEmail) return res.status(400).send({ status: false, message: "This email is already registered" });

        if (!password) { return res.status(400).send({ status: false, message: "Password is mandatory" }) };
        if (!check.isValidPassword(password)) { return res.status(400).send({ status: false, message: "Password should be valid" }) };
        const encryptedPassword = await bcrypt.hash(password, 10)

        const userDetails = { name, email, password: encryptedPassword }


        const newUser = await userModel.create(userDetails);
        return res.status(201).send({ status: true, message: "User created successfully", data: newUser });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//======================================LOGIN USER===============================================================

const userLogin = async (req, res) => {
    try {

        let data = req.body

        let { email, password } = data
        if (!check.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Please provide login details" })

        if (!email) {
            return res.status(400).send({ status: false, message: "Email is required!!" })
        }

        // check email for user
        let user = await userModel.findOne({ email: email });
        if (!user) return res.status(400).send({ status: false, message: "Email is not correct, Please provide valid email" });

        if (!password) {
            return res.status(400).send({ status: false, message: "Password is required!!" })
        }

        // check password of existing user
        let pass = await bcrypt.compare(password, user.password)
        if (!pass) return res.status(400).send({ status: false, message: "Password is not correct, Please provide valid password" });

        // using jwt for creating token
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                exp: Math.floor(Date.now() / 1000) + (60 * 3600),
                iat: new Date().getTime()
            },
            "palnesto"
        );

        return res.status(200).send({ status: true, message: "User login successfully", data: { userId: user._id, token: token } });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createUser, userLogin }