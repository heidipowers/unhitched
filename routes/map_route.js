'use strict'

const mapModel = require('../models/map_model');
const mapRouter = require('express').Router();
const timeline = require('../db/timeline');

const incidentModel = require('../models/incident_model');


mapRouter.get('/', incidentModel.getIncidents, mapModel.getMap, (req, res) => {
  //res.send('hello')
  console.log(res.results, "OUTSIDE MAP")
  res.json(res.results);
})

mapRouter.get('/timeline', (req, res)=>{
  res.json(timeline);
})





module.exports = mapRouter;
