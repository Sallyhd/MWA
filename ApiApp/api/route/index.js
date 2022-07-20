const express = require("express");
require("dotenv").config();
const router = express.Router();
const senatorsController = require("../controller/senatorsController");

router.route(process.env.SENATORS_ROUTE)
    .get(senatorsController.getAll);

router.route(process.env.SENATOR_ID_ROUTE)
    .get(senatorsController.getOne)
    .delete(senatorsController.deleteOne);

module.exports=router;