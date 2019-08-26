const mongoose = require('mongoose')
const Schema = mongoose.Schema

let outcomeSchema= new Schema({
    planningId:{
        type: Schema.Types.ObjectId,
        ref: 'Planning'
    },
    category: {
        type: String
    },
    date: {
        type: Date
    },
    note: {
        type: String
    },
    amount: {
        type: Number
    }

},{ timestamps: true })

let Outcome= new mongoose.model('Outcome', outcomeSchema)

module.exports= Outcome