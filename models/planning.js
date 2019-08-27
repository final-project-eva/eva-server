const mongoose = require('mongoose')
const Schema = mongoose.Schema


let planningSchema= new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId required']
    },
    username: {
        type: String
    },
    income: {
        type: Number,
        min : [0, 'Income not valid input amount']
    },
    budgets: [{
        category: {
            type: String,
        },
        amount: {
            type: Number,
        }
    }],
    outcome: [{
        type: Schema.Types.ObjectId,
        ref: 'Outcome'
    }],
    outcomeOverBudget:[{
        type: Schema.Types.ObjectId,
        ref: 'Outcome'
    }],
    balance: {
        type: Number
    },
    overBudget: {
        type: Number,
        default: 0
    }

},{timestamps: true})


let Planning= new mongoose.model('Planning', planningSchema)


module.exports= Planning