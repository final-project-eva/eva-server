const chai = require('chai')
const chaiHttp = require('chai-http')
const deleteAllUser = require('../helpers/deleteDataTesting')
const User =  require('../models/user')

const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect

let userId= null
let planningId= null

after(function(done){
    deleteAllUser('planning',done)
})

before(function(done){
    let data={
        firstname: 'ana',
        lastname: 'mei',
        email: 'ana@mail.com',
        phone_number: "081122334455",
        password: 'ana123'
    }

    User.create(data)
    .then(user =>{
        userId= user._id
        done()
    })
    .catch(error => {
        console.log(error)
        done()
    })
})


describe('Test Model Planning', () => {

    describe('Post planning', () => {
        it('should be an object with 201 status code', (done) => {
            const data={
                userId: userId,
                income: 1000000,
                budgets:  [{
                    "category": "food and beverages",
                    "amount": 500000
                },{
                    "category": "bills",
                    "amount": 200000
                },{
                    "category": "transportation",
                    "amount": 300000	
                }]
            }

            chai.request(app).post('/plan')
            .send(data)
            .then((res) => {

                planningId= res.body._id

                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('income')
                expect(res.body).to.have.property('budgets')
                expect(res.body).to.have.property('outcome')
                expect(res.body).to.have.property('outcomeOverBudget')
                expect(res.body).to.have.property('balance')
                expect(res.body).to.have.property('overBudget')
                expect(res.body.income).to.equal(data.income);
                done()
            })
            .catch(function(err){
                console.log(err)  
            })
        })
    })

    describe('Find All Planning', () => {
        it('should send array with status code 200', (done) => {

            chai.request(app).get(`/plan/${userId}`)
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
            .catch(function(err){
                console.log(err)  
            })
        })
    })

    describe('Find One Planning', () => {
        it('should send array with status code 200', (done) => {

            chai.request(app).get(`/plan/detail/${planningId}`)
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('income')
                expect(res.body).to.have.property('budgets')
                expect(res.body).to.have.property('outcome')
                expect(res.body).to.have.property('outcomeOverBudget')
                expect(res.body).to.have.property('balance')
                expect(res.body).to.have.property('overBudget')
                done()
            })
            .catch(function(err){
                console.log(err)  
            })
        })
    })

    describe('Update planning', () => {
        it('should be an object with 200 status code', (done) => {
            const data={
                    income: 2000000,
                    balance: 2000000
                }

            chai.request(app).patch(`/plan/${planningId}`)
            .send(data)
            .then((res) => {

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('income')
                expect(res.body).to.have.property('budgets')
                expect(res.body).to.have.property('outcome')
                expect(res.body).to.have.property('outcomeOverBudget')
                expect(res.body).to.have.property('balance')
                expect(res.body).to.have.property('overBudget')
                expect(res.body.income).to.equal(data.income)
                expect(res.body.balance).to.equal(data.balance);
                done()
            })
            .catch(function(err){
                console.log(err)  
            })
        })
    })

    describe('Delete Planning success', () => {
        it('should send object with status code 200', (done) => {

            chai.request(app).delete(`/plan/${planningId}`)
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                done()
            })
            .catch(function(err){
                console.log(err)  
            })
        })
    })

    describe('Delete Planning failed', () => {
        it('should send object with status code 200', (done) => {

            chai.request(app).delete(`/plan/5d5fc80d8d08ef536ca939ca`)
            .then((res) => {
                expect(res).to.have.status(404)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err)  
            })
        })
    })

    describe('Delete Planning failed', () => {
        it('should send object with status code 500', (done) => {

            chai.request(app).delete(`/plan/qwerty`)
            .then((res) => {
                expect(res).to.have.status(500)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err)  
            })
        })
    })

})