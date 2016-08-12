'use strict'

const dbModel = require('../models/db');

const incidentModel = require('../models/incident_model');
const incidentRouter = require('express').Router();


//get list of addresses from DB

incidentRouter.get('/', incidentModel.getIncidents, (req, res) => {
  console.log(res.incidents, "OUTSIDE")
  res.json(res.incidents);
})

incidentRouter.get('/wordcloud', incidentModel.getWords ,(req, res)=>{
  res.json(res.words)
})




module.exports = incidentRouter;
