let objectModel = {
    user: require("../models/user"),
    planning: require('../models/planning'),
    outcome: require('../models/outcome')
}
module.exports = function (modelName, done) {

    if (process.env.NODE_ENV === 'test') {
       

        objectModel[modelName].deleteMany()
            .then(() => {
                console.log(`${modelName} collection deleted!`);
                done()
            })
            .catch(function (err) {
                console.log(err)
            });

    }
}