const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        console.log(req.body);

        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: req.body.password
        })
            .then((newuser) => {
                res.status(201).json(newuser)
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log(req.body);

        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                throw err
            } else {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let obj = {
                            id: user._id,
                            email: user.email
                        }
                        res.json({ 
                            userId: user._id,
                            token: jwt.sign(obj)
                         })

                    } else {
                        res.status(400).json({
                            message: "wrong password"
                        })
                    }
                } else {
                    res.status(400).json({
                        message: "username wrong"
                    })
                }
            }
        })
    }

    static updateProfile(req,res,next){
       
        User.findById(req.decoded.id)
        .then(user => {

            if(user.email === req.body.email){
                const { firstname, lastname, phone_number }= req.body

                return User.findByIdAndUpdate(req.decoded.id, 
                        {firstname: firstname, lastname: lastname, phone_number: phone_number }, { runValidators: true, new: true })
            }else{
                
                return User.findByIdAndUpdate(req.decoded.id, 
                    { ...req.body }, { runValidators: true, new: true })
            }
        })
        .then((data) => {
            res.status(200).json(data)
            
        })
        .catch(next)

    }

    static fetchUser(req,res,next){
        User.findById(req.decoded.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static checkUser(req,res,next){
        User.find({username: req.params.username})
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
    }



}

module.exports = UserController