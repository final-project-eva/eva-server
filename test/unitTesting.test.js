const chai = require('chai');
const expect = chai.expect;
const deleteAllUser = require('../helpers/deleteDataTesting')
const errorHandler = require('../helpers/generateResponse')

describe('Test deleteDataTesting', function(){
    it('should err', function(done){
        process.env.NODE_ENV = "dev"

        let testENV = deleteAllUser('Users',done)
        console.log(testENV);
        
        expect(testENV).to.equal(null)
        done()
    })
})
describe('Test errorhandling', function(){
    it('should err 500', function(done){
        process.env.NODE_ENV = "test"
        let result = errorHandler(new Error(""))
        console.log(result);
        
        expect(result.errorCode).to.equal(500)
        expect(result.errMsg).to.equal("Internal Server Error")
        done()
    })
})
