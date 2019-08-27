const chai = require('chai');
const chaiHttp = require('chai-http');
const deleteAllUser = require('../helpers/deleteDataTesting')

const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

let idToken =''
let idToken2 =''
let username =''

after(function(done){
    deleteAllUser('user',done)
})

describe('Test users', function(){
    describe('post register', function(){
        it('should be an object with 201 status code',function(done){
            const data = {email:'viuty@yahoo.com', password: '123456', firstname: 'viuty', lastname: 'tiadita', username: "viuty",phone_number: "081973468777"}
            chai.request(app).post('/users/register')
            .send(data)
            .then(function(res){
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body).to.have.property('firstname')
                expect(res.body).to.have.property('lastname')
                expect(res.body).to.have.property('username')
                expect(res.body).to.have.property('phone_number')
                done()
            })
            .catch(function(err){
                console.log(err);  
            })
        })
        it('should be an object with 400 status code(email has been used)',function(done){
            const data = {email:'tviuty@yahoo.com', password: '123456', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777", username: "tviuty"}
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

        it('should be an object with 400 status code(username has been used)',function(done){
            const data = {email:'uviuty@yahoo.com', password: '123456', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777", username: "tviuty"}
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
        
        it('should be an object with 400 status code(is not a valid email)',function(done){
            const data = {email:'tviuty.yahoo', password: '123456', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777", username: "uviuty" }
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
            const data = {email:'tviuty@yahoo.com', password: '123', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777", username: "yviuty"}
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
            .send({email:'viuty@yahoo.com', password: '123456'})
            .then(function(res){
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                idToken = res.body.token
                console.log(idToken);
                console.log(res.body.userId);
                
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        it('should be an access token with 200 status code',function(done){
            chai.request(app).post('/users/login')
            .send({email:'tviuty@yahoo.com', password: '123456'})
            .then(function(res){
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                idToken2 = res.body.token
                console.log(idToken2);
                console.log(res.body.userId);
                
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
            const data = {email:'tviuty@ya', password: '123456'}
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

        it('should be an object with 400 status code(wrong password)',function(done){
            const data = {email:'tviuty@yahoo.com', password: '12345699'}
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

        it('should be an object with 400 status code(email not found)',function(done){
            const data = {email:'vsuzy@yahoo.com', password: '123456'}
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
    })


    describe('update profile', function(){
        it('should be an object with 200 status code(same email and username)', function(done){
            const data = {email:'viuty@yahoo.com', password: '123456', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777", username:"viuty"}
            chai.request(app).put('/users')
            .set('token',idToken)
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
        
     
        it('should be an object with 401 status code(without token)', function(done){
            const data = {email:'aaa@yahoo.com', password: '123456', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777"}
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

        it('should be an object with 200 status code(change email)', function(done){
            const data = {email:'vsuzy@yahoo.com', password: '123456', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777", username: 'viuty'}
            chai.request(app).put('/users')
            .set('token',idToken)
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

        it('should be an object with 200 status code(change username)', function(done){
            const data = {email:'vsuzy@yahoo.com', password: '123456', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777", username: 'viutytiadita'}
            chai.request(app).put('/users')
            .set('token',idToken)
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

        it('should be an object with 200 status code(change both)', function(done){
            const data = {email:'vsuzy1206@yahoo.com', password: '123456', firstname: 'viuty', lastname: 'tiadita',phone_number: "081973468777", username: 'tiaditaviuty'}
            chai.request(app).put('/users')
            .set('token',idToken)
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
    })


    describe('fetch user', function(){
        it('should be an object with 200 status code', function(done){
            chai.request(app).get('/users')
            .set('token',idToken2)
            .then(function(res){
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body).to.have.property('firstname')
                expect(res.body).to.have.property('lastname')
                expect(res.body).to.have.property('username')
                username = res.body.username
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
                expect(res.body).to.have.property('message')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        before(function (done){
            deleteAllUser('user',done)
        })
        it('should be an object with 401 status code(different token)', function(done){
            chai.request(app).get('/users')
            .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjIyNTBjMTQ5NmJlMGVkYjUxZTljMiIsImVtYWlsIjoidml1dHlAeWFob28uY29tIiwiaWF0IjoxNTY2NzEzMTAxfQ.2dwP2npkG_eKu7ETCj9eKUZB1g2aowqHTiGRc6UMYvM')
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
    
    describe('check user', function(){
        it('should be an object with 200 status code', function(done){
            chai.request(app).get(`/users/${username}`)
            .then(function(res){
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        
    })
    
})