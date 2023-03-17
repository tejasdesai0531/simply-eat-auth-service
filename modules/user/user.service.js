
let User = require('../../models/user.model');

let { genPassword, validPassword } = require('../../util/passwordUtils')
const jwt = require('jsonwebtoken');

module.exports = class userService {

    constructor() {

    }

    async signUp(formData) {
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


    async logIn() {

    }

}