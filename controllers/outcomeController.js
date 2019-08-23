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
                plans.outcome.push(newOutcome)
                
                let newPlans= await plans.save()
    
                res.status(201).json(newPlans)
    
            }else{
                throw { code: 404, message: 'Plan Not Found!'}
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