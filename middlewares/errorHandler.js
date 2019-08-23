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
    else if( err.name === 'TokenExpiredError'){
        res.status(401).json({
            message: "Token Expired"
        })
    }
    else if(err.code){
        res.status(err.code).json({
            message: err.message
        })
    }
    else {
        res.status(500).json({
            message: err
        })
    }
}