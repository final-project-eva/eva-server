    require('dotenv').config()


const express = require("express")
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const route = require('./routes')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')

// mongodb+srv://anameilani:ana1106131176@cluster0-ogdd6.gcp.mongodb.net/eva-financial-planning?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://viuty:yamada@cluster0-nq675.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useFindAndModify:false})
.then(()=>{
    console.log('success connect to database')
})
.catch(err => {
    console.log('failed to connect',err);
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/',route)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
})

module.exports = app


//mongodb+srv://anameilani:ana1106131176@cluster0-ogdd6.gcp.mongodb.net/eva-financial-planning?retryWrites=true&w=majority
//mongodb://localhost/eva