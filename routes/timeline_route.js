'use strict'


const timelineRouter = require('express').Router();
const timelineData = require('../data/timeline');



timelineRouter.get('/', (req, res)=>{
  res.json(timelineData);
})





module.exports = timelineRouter;
