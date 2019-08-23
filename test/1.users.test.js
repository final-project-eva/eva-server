const chai = require('chai');
const chaiHttp = require('chai-http');
const deleteAllUser = require('../helpers/deleteDataTesting')

const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

let idToken =''
after(function(done){
    deleteAllUser('user',done)
})

describe('Test users', function(){
    describe('post register', function(){
        it('should be an object with 201 status code',function(done){
            const data = {email:'aaa@yahoo.com', password: '12345', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777"}
            chai.request(app).post('/users/register')
            .send(data)
            .then(function(res){
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body).to.have.property('firstname')
                expect(res.body).to.have.property('lastname')
                expect(res.body).to.have.property('phone_number')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
        it('should be an object with 400 status code(is not a valid email)',function(done){
            const data = {email:'tviuty.yahoo', password: '12345', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777" }
            chai.request(app).post('/users/register')
            .send(data)
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
        it('should be an object with 400 status code(length too short)',function(done){
            const data = {email:'tviuty@yahoo.com', password: '123', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777"}
            chai.request(app).post('/users/register')
            .send(data)
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
        it('should be an object with 400 status code((empty body))',function(done){
            const data = {}
            chai.request(app).post('/users/register')
            .send(data)
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
    })
    describe('post login', function(){
        it('should be an access token with 200 status code',function(done){
            chai.request(app).post('/users/login')
            .send({email:'tviuty@yahoo.com', password: '12345'})
            .then(function(res){
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                idToken = res.body.token
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        
        it('should be an object with 400 status code(empty body)',function(done){
            const data = {}
            chai.request(app).post('/users/login')
            .send(data)
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        
        it('should be an object with 400 status code(is not valid email)',function(done){
            const data = {email:'tviuty@ya', password: '12345'}
            chai.request(app).post('/users/login')
            .send()
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
    })


    describe('fetch user', function(){
        it('should be an object with 200 status code', function(done){
            chai.request(app).get('/users')
            .set(idToken)
            .then(function(res){
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body).to.have.property('firstname')
                expect(res.body).to.have.property('lastname')
                expect(res.body).to.have.property('phone_number')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        it('should be an object with 401 status code(without token)', function(done){
            chai.request(app).get('/users')
            .then(function(res){
                expect(res).to.have.status(401)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body).to.have.property('firstname')
                expect(res.body).to.have.property('lastname')
                expect(res.body).to.have.property('phone_number')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
    })
    
    describe('update profile', function(){
        it('should be an object with 200 status code', function(done){
            const data = {email:'aaa@yahoo.com', password: '12345', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777"}
            chai.request(app).put('/users')
            .set(idToken)
            .send(data)
            .then(function(res){
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body).to.have.property('firstname')
                expect(res.body).to.have.property('lastname')
                expect(res.body).to.have.property('phone_number')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
        it('should be an object with 400 status code(empty body)',function(done){
            const data = {}
            chai.request(app).put('/users')
            .set(idToken)
            .send(data)
            .then(function(res){
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        it('should be an object with 401 status code(without token)', function(done){
            const data = {email:'aaa@yahoo.com', password: '12345', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777"}
            chai.request(app).put('/users')
            .send(data)
            .then(function(res){
                expect(res).to.have.status(401)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
    })

    
})