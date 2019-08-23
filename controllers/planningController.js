const Planning= require('../models/planning')
const Outcome= require('../models/outcome')

class planningController{

    static create(req, res, next){

        let newPlanning= {
            userId: req.body.userId,
            income: req.body.income,
            budgets:req.body.budgets,
            outcome: [],
            balance: req.body.income,
            overBudgets: 0
        }

        Planning.create(newPlanning)
        .then(plan => {
            res.status(201).json(plan)
        })
        .catch(next)
    }

    static findAll(req, res, next){

        Planning.find({userId: req.params.userId})
        .populate('outcome.outcomeId')
        .sort({createdAt: -1})
        .then(plans => {
            res.status(200).json(plans)
        })
        .catch(next)
    }

    static findOne(req, res, next){

        Planning.findById(req.params.id)
        .then(plan => {
            res.status(200).json(plan)
        })
        .catch(next)
    }

    static update(req, res, next){

        Planning.findByIdAndUpdate(req.params.id, {...req.body},{new: true})
        .then(plan =>{
            res.status(200).json(plan)
        })
        .catch(next)
    }

    static remove(req,res,next){

        Planning.findById(req.params.id)
        .then(plan=>{
            if(plan){
                Planning.deleteOne({_id: plan._id})
                .then(() =>{
                    res.status(200).json(plan)
                })
                .catch(next)

            }else{
                throw {code: 404, message: 'Planing Not Found'}
            }
        })
        .catch(next)
    }

}

module.exports= planningController