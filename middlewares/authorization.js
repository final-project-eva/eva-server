const Planning = require('../models/planning')
const User = require('../models/user')

function authorization(req, res, next) {
    Planning.findById(req.params.id)
        .then((data) => {
            if (data.userId == req.decoded.id) {
                next()
            }else{
                res.send(401).json({
                    message: " you are not authorized"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.send(401).json({
                message: " you are not authorized"
            })
        })
}

function authorizationUser(req,res,next){
    User.findById(req.decoded.id)
    .then(data => {
        if(data._id == req.decoded.id){
            next()
        }else {
            res.send(401).json({
                message: " you are not authorized"
            })
        }
    })
    .catch(err => {
        res.send(401).json({
            message: " you are not authorized"
        })
    })
}

module.exports = { authorization, authorizationUser }