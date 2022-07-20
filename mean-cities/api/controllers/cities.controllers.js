const mongoose = require("mongoose");
const City = mongoose.model(process.env.CITY_MODEL);

const getAll = function (req, res) {
    let offset;
    let count;
    if(req.query && req.query.lat && req.query.lng){
        _geoSearch(req,res,response);
        return;
    }
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count,10);
    }
    console.log("offset",offset);
    console.log("count",count);
    City.find().skip(offset).limit(count).exec(function (err, cities) {
        console.log("cities",cities);
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: cities
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const _geoSearch=function(req,res,response){
    let lat =parseFloat(req.query.lat,10);
    let lng =parseFloat(req.query.lng,10);
    const point={
        type:"Point",
        coordinates:[lng,lat]
    };
    const query={
        "location.coorsinates":{
        $near:{
            $geometry:point,
            $maxDistance:1000000
        }
    }
    };

    City.find(query).exec(function(err,cities){
        if(err){
            response.status=500;
            response.message=err;
        }
        else{
            response.message=cities;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const cityId = req.params.cityId;
    City.findById(cityId).exec(function (err, city) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: city
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!city) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};