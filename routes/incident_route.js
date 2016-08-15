'use strict'

const dbModel = require('../models/db');

const incidentModel = require('../models/incident_model');
const incidentRouter = require('express').Router();

incidentRouter.route('/update/:id')
  .put(incidentModel.updateIncident, (req, res) => {
    console.log('**hitting put: **\n',req.body, req.params);
    res.redirect('/incident/update');
  })


incidentRouter.route('/update')
  .get(incidentModel.getIncidents, (req, res) => {
    res.render('update', {incidents: res.incidents});
})
  .post(incidentModel.createNewIncident, (req, res) => {
    res.status(200);
    res.redirect('/incident/update');
  })

incidentRouter.route('/')
  .get (incidentModel.getIncidents, (req, res) => {
    res.json(res.incidents);
})





module.exports = incidentRouter;
