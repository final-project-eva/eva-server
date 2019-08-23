const chai = require('chai')
const chaiHttp = require('chai-http')
const deleteAllUser = require('../helpers/deleteDataTesting')
const User =  require('../models/user')
const Planning =  require('../models/planning')

const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect


let planningId= null
let outcomeId= null

// after(function(done){
//     deleteAllUser('outcome',done)
// })

before(function async (done){
    let dataUser= {
        firstname: 'ana',
        lastname: 'mei',
        email: 'anam@mail.com',
        phone_number: "081122334455",
        password: 'ana123'

        }

    User.create(dataUser)
    .then(user => {
        let dataPlanning={
            "userId": user._id,
            "income": 10000,
            "budgets": [{
                    "category": "food and beverages",
                    "amount": 5000
                },{
                    "category": "bills",
                    "amount": 2000	
                },{
                    "category": "transportation",
                    "amount": 3000	
                }] 
            }
        
        return Planning.create(dataPlanning)
        
    })
    .then(plan => {
        planningId= plan._id
        done()
    })
    .catch(error => {
        console.log(error)
        
    })

})


describe('Outcome test', () => {

    describe('Post Outcome when not over budget', () => {
        it('should send object with status code 201', (done) => {
            
            let data= {
                planningId: planningId,
                category: 'bills',
                date: new Date(),
                note: 'bayar listrik',
                amount: 1000
            }

            chai.request(app).post('/outcome')
            .send(data)
            .then((res) => {
               
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('income')
                expect(res.body).to.have.property('budgets')
                expect(res.body).to.have.property('outcome')
                expect(res.body).to.have.property('outcomeOverBudget')
                expect(res.body).to.have.property('overBudget')
                done()
            })
            .catch(function(err){
                console.log(err)  
            })

        })
    })

    describe('Post Outcome when over budget', () => {
        it('should send object with status code 201', (done) => {
            
            let data= {
                planningId: planningId,
                category: 'transportation',
                date: new Date(),
                note: 'beli motor',
                amount: 3500
            }

            chai.request(app).post('/outcome')
            .send(data)
            .then((res) => {
                outcomeId= res.body.outcome[0]._id

                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('income')
                expect(res.body).to.have.property('budgets')
                expect(res.body).to.have.property('outcome')
                expect(res.body).to.have.property('outcomeOverBudget')
                expect(res.body).to.have.property('overBudget')
                done()
            })
            .catch(function(err){
                console.log(err)  
            })

        })
    })

    describe('Find one outcome', () => {
        it('should send object with status code 200', (done) => {
            
            chai.request(app).get(`/outcome/${outcomeId}`)
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

    describe('Delete one outcome', () => {
        it('should send object with status code 200', (done) => {
           
            chai.request(app).delete(`/outcome/${outcomeId}`)
            .then((res) => {

                expect(res).to.have.status(200)
                done()
            })
            .catch(function(err){
                console.log(err)  
            })
        })
    })
})