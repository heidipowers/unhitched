'use strict'

const mapModel = require('../models/map_model');
const mapRouter = require('express').Router();
const testing = require('../db/test');

const addressModel = require('../models/address_model');


mapRouter.get('/', addressModel.getAddresses, mapModel.getMap, (req, res) => {
  //res.send('hello')
  console.log(res.results, "OUTSIDE MAP")
  res.json(res.results);
})

mapRouter.get('/timeline', (req, res)=>{
  res.json(testing);
})




module.exports = mapRouter;
