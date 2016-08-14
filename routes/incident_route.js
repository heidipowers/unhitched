'use strict'

const dbModel = require('../models/db');

const incidentModel = require('../models/incident_model');
const incidentRouter = require('express').Router();


incidentRouter.route('/update')
  .get (incidentModel.getIncidents, (req, res) => {
    res.render('update', {incidents: res.incidents});
})
  .post(incidentModel.createNewIncident, (req, res) => {
    console.log(req.body)
    res.status(200).send('created incident');
    console.log(req.incidents)
  })

incidentRouter.route('/')
  .get (incidentModel.getIncidents, (req, res) => {
    res.json(res.incidents);
})





module.exports = incidentRouter;
