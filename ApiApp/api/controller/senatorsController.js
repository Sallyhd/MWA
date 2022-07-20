const mongoose = require("mongoose");
require("dotenv").config();

const Senator = mongoose.model(process.env.DB_NAME);
const getAll=function(req,res){
    const response = {
        status:200,
        message:""
    };
    let count=parseInt(process.env.COUNT_DEFAULT_VAL,process.env.BASE_10);
    let offset=parseInt(process.env.OFFSET_DEFAULT_VAL,process.env.BASE_10);
    if(req.query && req.query.count){
        count = parseInt(req.query.count,process.env.BASE_10);
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,process.env.BASE_10);
    }
    if(isNaN(offset) || isNaN(count)){
        response.status=400;
        response.message=process.env.INVALID_OFFSET_COUNT;
        res.status(response.status).json(response.message);
        return;
    }
    Senator.find().skip(offset).limit(count).exec(function(err,senators){
        if(err){
            response.status=500;
            response.message=err;
        }
        else{
            if(!senators){
                response.status =404;
                response.message=process.env.NOT_FOUND_SENATORS;
            }
            else{
                response.message=senators;
            }
        }
        res.status(response.status).json(response.message);
    });

}
const getOne=function(req,res){
    const response={
        status:200,
        message:""
    };
    const senatorId = req.params.senatorId;
    if(mongoose.isValidObjectId(senatorId)){
        Senator.findById(senatorId).exec(function(err,senator){
            if(err){
                response.status=500;
                response.message=err;
            }
            else{
                if(!senator){
                    response.status=404;
                    response.message=process.env.NOT_FOUND_SENATORS;
                }
                else{
                    response.message=senator;
                }
            }
            res.status(response.status).json(response.message);
        })
    }
    else{
        response.status=400;
        response.message=process.env.NOT_VALID_ID;
        res.status(response.status).json(response.message);
    }
}
const deleteOne=function(req,res){
    const response={
        status:200,
        message:""
    };
    const senatorId = req.params.senatorId;
    if(mongoose.isValidObjectId(senatorId)){
        Senator.findByIdAndDelete(senatorId).exec(function(err,deletedSenator){
            if(err){
                response.status=500;
                response.message=err;
            }
            else{
                if(!deletedSenator){
                    response.status=404;
                    response.message=process.env.NOT_FOUND_SENATORS;
                }
                else{
                    response.message=deletedSenator;
                }
            }
            res.status(response.status).json(response.message);
        })
    }
    else{
        response.status=400;
        response.message=process.env.NOT_VALID_ID;
        res.status(response.status).json(response.message);
    }
}


module.exports={
    getAll,
     getOne,
     deleteOne
}