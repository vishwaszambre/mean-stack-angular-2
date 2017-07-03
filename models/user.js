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
        return true;
    }
}

let validUsername = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
        return regExp.test(username);
    }
};

const usernameValidators = [{
    validator: usernameLengthChecker, message: 'Username length should be atleast 3 characters and atmax 15 characters'
}, {
    validator: validUsername, message: 'Username must not have special character'
}


]

const emilValidators = [
    {
        validator: emailLengthChecker, message: 'Email length should be atleast 5 character and atmax 15 character'
    }, {
        validator: validEmailChecker, message: 'Please enter valid email'
    }
]

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emilValidators },
    username: { type: String, required: true, unique: true, lowercase: true },
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

userSchema.method.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);