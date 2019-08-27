const generateResponse = require('../helpers/generateResponse')

module.exports = function (err, req, res, next) {
    console.log(err);
    
    if(err.name == 'ValidationError'){
        res.status(400).json({
            message: err.message
        })
    }else if(err.name == 'JsonWebTokenError'){
        res.status(401).json({
            message: 'Sorry you are not authorized'
        })
    }
    else if(err.code){
        res.status(err.code).json({
            message: err.message
        })
    }
    else {

        let result = generateResponse(err)
        res.status(result.errorCode).json({
            message: result.errMsg
        })
    }

}