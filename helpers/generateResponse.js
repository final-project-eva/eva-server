function generateError(err){
    console.log('masuk 500');
    let errorCode =err.code || 500
    let errMsg = err.message || 'Internal Server Error'

    return {
        errorCode,
        errMsg
    }
}

module.exports = generateError