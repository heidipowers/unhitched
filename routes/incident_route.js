'use strict'

const dbModel = require('../models/db');

const incidentModel = require('../models/incident_model');
const incidentRouter = require('express').Router();


incidentRouter.route('/update')
  .get (incidentModel.getIncidents, (req, res) => {
    console.log(res.incidents)
    res.render('update', {incidents: res.incidents});
})

incidentRouter.route('/')
  .get (incidentModel.getIncidents, (req, res) => {
    res.json(res.incidents);
})




module.exports = incidentRouter;
