const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        // req.body.email;
        // req.body.username;
        // req.body.password;
        if (!req.body.email) {
            res.json({ success: false, message: 'Please provide valid email' });
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'Please provide valid username' });
            }
            else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'Please provide password' });
                } else {
                    //console.log(req.body);
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'Oops! Duplicate entry, user already exist in system' });
                            }
                        }
                        if (err) {
                            if (err.errors) {
                                if (err.errors.email) {
                                    res.json({ success: false, message: err.errors.email.message })
                                } else {
                                    if (err.errors.username) {
                                        res.json({ success: false, message: err.errors.username.message })
                                    }
                                    else {
                                        if (err.errors.password) {
                                            res.json({ success: false, message: err.errors.password.message })
                                        } else {
                                            res.json({
                                                success: false, message: err
                                            });
                                        }
                                    }
                                }
                            } else {
                                res.json({ success: false, message: 'Oops! Could not save user. Error: ', err });
                            }

                        } else {
                            res.json({ success: true, message: 'User created successfully!' });
                        }
                    });

                }

            }
        }
    })

    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'Email is not provided' });
        } else {
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Email already taken' })
                    } else {
                        res.json({ success: true, message: 'Email is available' })
                    }
                }
            })
        }

    });

    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'Username is not provided' });
        } else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Username already taken' })
                    } else {
                        res.json({ success: true, message: 'Username is available' })
                    }
                }
            })
        }

    });
    return router;
}