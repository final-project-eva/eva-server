module.exports = function (err, req, res, next) {
    if (err.code === 404) {
        res.status(404).json({
            message: "Not Found"
        })
    } else if (err.name === 'ValidationError') {
        let listError = []
        for (let error in err.errors) {
            listError.push({
                message: err.errors[error].message,
                path: err.errors[error].path
            })
        }
        res.status(400).json({
            listError
        })
    } else if (err.code === 500) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    } else {
        res.status(err.code).json({
            message: err.message
        })
    }
}