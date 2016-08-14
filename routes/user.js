'use strict'

const userModel = require('../models/user_model');
const userRouter = require('express').Router();


//get list of addresses from DB

userRouter.route('/admin')
  .get ((req, res) => {
    res.json(res.results);
})


module.exports = userRouter;
