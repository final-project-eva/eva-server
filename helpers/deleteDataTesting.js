let objectModel = {
    user: require("../models/user"),
    planning: require('../models/planning'),
    outcome: require('../models/outcome'),
    Users: {}
}
module.exports = function (modelName, done) {
    if (process.env.NODE_ENV === 'test') {
        return objectModel[modelName].deleteMany({
            email: {
                $nin : ['tviuty@yahoo.com']
            }
        })
            .then(() => {
                console.log(`${modelName} collection deleted!`);
                done()
                return (`${modelName} collection deleted!`)
            })
            

    }else{
        return null
    }
}