'use strict'

const mapModel = require('../models/map');
const mapRouter = require('express').Router();


mapRouter.get('/', mapModel.getMap, (req, res) => {
  //res.send('hello')
  res.send(res.results);
})




module.exports = mapRouter;
