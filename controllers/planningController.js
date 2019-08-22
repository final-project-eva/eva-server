const Planning= require('../models/planning')

class planningController{

    static create(req,res,next){

    }

    static getAll(req,res,next){

        Planning.find({userId: req.params.userId})
        .sort({createdAt: -1})
        .then(plans => {
            res.status(200).json(plans)
        })
        .catch(next)
    }

    static update(req,res,next){

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