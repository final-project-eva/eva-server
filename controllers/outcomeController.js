const Outcome= require('../models/outcome')
const Planning= require('../models/planning')

class outcomeController{

    static async create(req,res,next){
        try {
            let outcome={
                planningId: req.body.planningId,
                category: req.body.category,
                date: req.body.date,
                note: req.body.note,
                amount: req.body.amount
            }
            let plans= await Planning.findById(req.body.planningId)
            
            if(plans){
                
                let newOutcome= await Outcome.create(outcome)
                let budget= plans.budgets.filter(item => {
                            return item.category.toLowerCase().includes(req.body.category.toLowerCase())
                            })
                let indexBudget= plans.budgets.indexOf(budget[0])
            
                plans.outcome.push(newOutcome)
                let newBalance= plans.balance - Number(req.body.amount)
                let currentBudget= budget[0].amount - Number(req.body.amount)

                if(currentBudget > 0){
                    budget[0].amount= currentBudget
                    plans.balance= newBalance
                }else{
                    plans.overBudget=  Number(req.body.amount) - budget[0].amount
                    budget[0].amount= 0
                    plans.outcomeOverBudget.push(newOutcome)
                    plans.balance= newBalance
                }

                // plans.balance= newBalance
                plans.budgets.splice(indexBudget, 1)
                plans.budgets.push(budget[0])
                
                plans.save()
                
                res.status(201).json(plans)
    
            }else{
                throw { code: 404, message: 'Plan Not Found!'}
            }

        } catch (error) {
            next()
        }

    }

    static findOne(req, res, next){
       console.log(req.params.id, '=================')
        Outcome.findById(req.params.id)
        .then(outcome => {
           
            res.status(200).json(outcome)
        })
        .catch(next)
    }


    static update(req, res, next){
        Outcome.findByIdAndUpdate(req.params.id, {...req.body},{new: true})
        .then(outcome => {
            res.status(200).json(outcome)
        })
        .catch(next)
    }

    static remove(req, res, next){
        Outcome.findByIdAndDelete(req.params.id)
        .then(outcome => {
            res.status(200).json(outcome)
        })
        .catch(next)
    }
}

module.exports= outcomeController