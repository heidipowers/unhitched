'use strict'

const dbModel = require('../models/db');

const incidentModel = require('../models/incident_model');
const incidentRouter = require('express').Router();


incidentRouter.route('/update')
  .get (incidentModel.getIncidents, (req, res) => {
    res.render('update', {incident: res.incidents});
})

incidentRouter.route('/')
  .get (incidentModel.getIncidents, (req, res) => {
    res.json(res.incidents);
})




module.exports = incidentRouter;
