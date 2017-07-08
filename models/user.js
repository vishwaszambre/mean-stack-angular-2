const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
var emailReg = require('email-regex');

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
}

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        return emailReg({ exact: true }).test(email);
    }
}

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false
        } else {
            return true;
        }

    }
};

let validUsername = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
        return regExp.test(username);
    }
};

let passwordLengthChecker = () => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length < 25) {
            return false
        }
    }
}

let validPassword = () => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/);
        return regExp.test(password);
    }
}

const passwordValidator = [
    {
        validator: validPassword, message: 'Password must have one uppercase, one lowercase, one number and special character'
    },
    {
        validator: passwordLengthChecker, message: 'Password length must be between 8 to 25 characters'
    }
]

const usernameValidators = [{
    validator: usernameLengthChecker, message: 'Username length should be atleast 3 characters and atmax 15 characters'
}, {
    validator: validUsername, message: 'Username must not have special character'
}


]

const emailValidators = [
    {
        validator: emailLengthChecker, message: 'Email length should be atleast 5 character and atmax 15 character'
    }, {
        validator: validEmailChecker, message: 'Please enter valid email'
    }
]

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    // password: { type: String, required: true, validate: passwordValidator }
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {
            return next(err);
        } else {
            this.password = hash;
            next();
        }
    });
});

userSchema.method.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);