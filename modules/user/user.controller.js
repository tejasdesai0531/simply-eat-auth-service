const Validator = require('validatorjs');
let User = require('../../models/user.model');
let { genPassword, validPassword } = require('../../util/passwordUtils')
const jwt = require('jsonwebtoken');
// const userService = new (require("./user.service"))();

module.exports = class userController {
    constructor() {

    }
    async signUp(req, res) {
        let returnResponse = {};
        let formData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            country_code: req.body.country_code,
            password: req.body.password,
            password_confirmation: req.body.password_confirmation,
            role_type: req.body.role_type,
            status: req.body.status
        };
        let rules = {
            username: "required|between:3,30",
            firstName: "required|between:3,30",
            lastName: "required|between:3,30",
            email: "required|email",
            mobile_no: ["required"],
            country_code: "required|numeric",
            // Minimum eight characters, at least one letter and one number:
            password: ["required", 'confirmed'],
            password_confirmation: ["required"],
            role_type: ["required"],
            status: ["boolean"]
        }

        let validation = new Validator(formData, rules);
        if (validation.passes() && !validation.fails()) {

            // check if email mobile_no and user_name doesn't exists 

            let isEmailExists = User.find({ email: formData.email });
            let isUsernameExists = User.find({ username: formData.username });
            let isMobilenoExists = User.find({ mobile_no: formData.mobile_no });
            let credentialExists = await Promise.all([isEmailExists, isUsernameExists, isMobilenoExists]);

            let isCredExistsError = [];

            credentialExists.forEach((value, id) => {
                if (value.length > 0) {

                    switch (id) {
                        case 0:
                            isCredExistsError.push("Email already exists")
                            break;
                        case 1:
                            isCredExistsError.push("Username already exists")
                            break;
                        case 2:
                            isCredExistsError.push("Mobile number already exists")
                            break;
                        default:
                            break;
                    }
                }
            })

            if (isCredExistsError.length > 0) {
                returnResponse = {
                    status: false,
                    value: isCredExistsError
                }
                return res.json(returnResponse);
            }

            // hash the password 
            let hashedPassword = genPassword(formData.password);

            //save the user
            formData.password = hashedPassword;
            delete formData.password_confirmation;

            try {
                await new User(formData).save();
                returnResponse = {
                    status: true,
                    message: "user created successfully"
                }

            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            returnResponse = {
                status: false,
                value: validation.errors.errors
            }
        }
        res.json(returnResponse);
    }

    async logIn(req, res) {
        let returnResponse = {};
        let formData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        let rules = {
            username: "required|between:3,30",
            email: "required|email",
            // Minimum eight characters, at least one letter and one number:
            password: ["required"]
        }

        let validation = new Validator(formData, rules);

        if (validation.passes() && !validation.fails()) {

            let user = await User.find({ email: formData.email });

            if (user.length == 0) {
                return res.json({
                    status: false,
                    value: "email doesn't exists "
                })
            }

            // check if formData.password and confirmPassword exists 
            let isPasswordCorrect = validPassword(formData.password, user[0].password);

            if (!isPasswordCorrect) {

                return res.json({
                    status: false,
                    value: "Password doesn't match"
                })
            }


            // creating user data and token and sending them. 

            const payload = {
                id: user[0]._id,
                username: user[0].username,
                email: user[0].email,
                role_type: user[0].role_type,
                status: user[0].status
            }

            try {
                const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${60 * 60 * 24 * 2}s` });
                delete user[0]._doc.password;
                return res.json({
                    status: true,
                    data: {
                        token: token,
                        userData: {
                            ...user[0]._doc
                        }
                    }
                })

            } catch (error) {

                return res.json({
                    status: false,
                    message: "somethig went wrong"
                })
            }


        }
        else {
            returnResponse = {
                status: false,
                value: validation.errors.errors
            }
        }
        res.json(returnResponse);





    }
}
