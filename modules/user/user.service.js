
let User = require('../../models/user.model');

let { genPassword, validPassword } = require('../../util/passwordUtils')
const jwt = require('jsonwebtoken');
const responses = require("./user.responses");
const responseHandler = new (require('../../util/baseResponse'))(responses);


module.exports = class userService {

    constructor() {

    }

    async signUp(formData) {

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
            return responseHandler.failure("credentail_exist", "credentail_exist");
        }

        // check if the email is verified or not. 
        
        let hashedPassword = genPassword(formData.password);
        formData.password = hashedPassword;
        delete formData.password_confirmation;

        try {
            await new User(formData).save();
            return responseHandler.success("user_created");
        }
        catch (error) {
            return responseHandler.failure("user_created_failed");
        }

    }


    async logIn(formData) {

        let user = await User.find({ email: formData.email });
        if (user.length == 0) {
            return responseHandler.failure("email_donst_exists");
        }
        // check if formData.password and confirmPassword exists 
        let isPasswordCorrect = validPassword(formData.password, user[0].password);
        if (!isPasswordCorrect) {
            return responseHandler.failure("password_not_matched");
        }
        // creating user data and token and sending them. 
        const payload = {
            id: user[0]._id,
            username: user[0].username,
            email: user[0].email,
            role_type: user[0].role_type,
            status: user[0].status
        }

        
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${60 * 60 * 24 * 2}s` });
        delete user[0]._doc.password;
        return responseHandler.success("user_loggedIn_success", {
            token: token,
            userData: {
                ...user[0]._doc
            }
        })


    }
}




