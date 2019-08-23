let objectModel = {
    user: require("../models/user")
}
module.exports = function (modelName, done) {

    if (process.env.NODE_ENV === 'test') {
        console.log('masuk delete testing');

        objectModel[modelName].deleteMany({
            _id: {
                $nin : ['5d3e75a6ce9b4c18a974bbe0','5d3e81a019766e2163c91637']
            }
        })
            .then(() => {
                console.log(`${modelName} collection deleted!`);
                done()
            })
            .catch(function (err) {
                console.log(err);
            });

    }
}