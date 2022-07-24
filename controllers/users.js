const user = require('../mock_data/users');

const { validationResult } = require('express-validator');
const User = require('../models/user');
const { findByIdAndRemove } = require('../models/user');

exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => {
            if (!users) {
                const error = new Error('Users does not exist.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Success', data:users})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        });
};

exports.createUsers = (req, res, next) => {
    // Create post in db
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const middlename = req.body.middlename;
    const birthday = req.body.birthday;
    const address = req.body.address;

    const user = new User({
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        birthday: birthday,
        address: address,
    });
    user
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Success",
                post: result
            });
        }).catch(err => {
            console.log()
        });
    
}

exports.getUser = (req, res, next) => {
    const user_id = req.params.user_id;
    User.findById(user_id)
        .then(user => {
            if (!user) {
                const error = new Error('User does not exist.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Success', data:user});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        });
}

exports.updateUser = (req, res, next) => {
    const user_id = req.params.user_id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const middlename = req.body.middlename;
    const birthday = req.body.birthday;
    const address = req.body.address;
    

    User.findById(user_id)
        .then(user => {
            if (!user) {
                const error = new Error('User does not exist.');
                error.statusCode = 404;
                throw error;
            }
            user.firstname = firstname;
            user.lastname = lastname;
            user.middlename = middlename;
            user.birthday = birthday;
            user.address = address;
            return user.save()
        })
        .then(result => {
            res.status(200).json({message: 'Success', data:result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteUser = (req, res, next) => {
    const user_id = req.params.user_id;
    User.findById(user_id)
        .then(user => {
            if (!user) {
                const error = new Error('User does not exist.');
                error.statusCode = 404;
                throw error;
            }
            return User.findByIdAndRemove(user_id)
        })
        .then(result => {
            res.status(200).json({message: 'Success'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        });
}