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
                
                
            if(Object.keys(plans).length !== 0 ){
                
                let newOutcome= await Outcome.create(outcome)
                console.log(newOutcome,'newco');
                
                let budget= plans.budgets.filter(item => {
                        return item.category.toLowerCase().includes(req.body.category.toLowerCase())
                    })
                let indexBudget= plans.budgets.indexOf(budget[0])
                console.log(newOutcome)
                plans.outcome.push(newOutcome._id)
                let newBalance= Number(plans.balance) - Number(req.body.amount)
                let currentBudget= Number(budget[0].amount) - Number(req.body.amount)

                if(currentBudget > 0){
                    
                    budget[0].amount= currentBudget
                    plans.balance= newBalance
                }else{
                    plans.overBudget=  Number(req.body.amount) - Number(budget[0].amount)
                    budget[0].amount= 0
                    plans.outcomeOverBudget.push(newOutcome._id)
                    plans.balance= newBalance
                }
                plans.budgets.splice(indexBudget, 1)
                plans.budgets.push(budget[0])
                
                plans.save()
                console.log(plans,'plans');
                res.status(201).json(plans)
            }

        } catch (error) {
           next()
        }

    }

    static async createAlexa(req, res, next){
        try {

            let plan=  await Planning.find({ username: req.body.username }).sort({ createdAt: -1 })
            let planningId= plan[0]._id

            let outcome={
                planningId: planningId,
                category: req.body.category,
                date: req.body.date,
                note: req.body.note,
                amount: req.body.amount
            }
            let plans= await Planning.findById(planningId)

                
            if(Object.keys(plans).length !== 0 ){
                
                let newOutcome= await Outcome.create(outcome)
                let budget= plans.budgets.filter(item => {
                        return item.category.toLowerCase().includes(req.body.category.toLowerCase())
                    })
                let indexBudget= plans.budgets.indexOf(budget[0])
            
                plans.outcome.push(newOutcome._id)

                let newBalance= plans.balance - Number(req.body.amount)
                let currentBudget= budget[0].amount - Number(req.body.amount)

                if(currentBudget > 0){
                    budget[0].amount= currentBudget
                    plans.balance= newBalance
                }else{
                    plans.overBudget=  Number(req.body.amount) - budget[0].amount
                    budget[0].amount= 0
                    plans.outcomeOverBudget.push(newOutcome._id)
                    plans.balance= newBalance
                }
                plans.budgets.splice(indexBudget, 1)
                plans.budgets.push(budget[0])
                
                let newPlans= await plans.save()
                
                console.log(newPlans, 'new plans')
                res.status(201).json(newPlans)
            }

        } catch (error) {
            next()
        }
       
    }

    static findOne(req, res, next){
       
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