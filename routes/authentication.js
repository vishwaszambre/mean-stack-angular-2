const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        // req.body.email;
        // req.body.username;
        // req.body.password;
        if(!req.body.email){
            res.json({success:false,message})
        }
        res.send('Hello world!');
    })
    return router;
}