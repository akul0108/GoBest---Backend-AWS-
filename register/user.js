const mongoose = require('mongoose');

const user = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var User = new user();
        User.email = req.body.email;
        User.fname = req.body.fname;
        User.lname = req.body.lname;
        User.contact = req.body.contact;
        User.gender = req.body.gender;
        User.address = req.body.address;
        User.password = req.body.password;
        User.save((err, doc) => {
            if(!err)
                res.send(doc);
            else
            {
                if(err.code == 11000)
                    res.status(422).send(['Duplicate email address found.']);
                else
                    return next(err);
            }
        })
}