'use strict'

const env         = process.env.NODE_ENV || 'development';
const DEV         = env==='development';
const dotenv      = (DEV) ? require('dotenv').config() : undefined;


const express     = require('express')
const app         = express()
const PORT        = process.env.PORT || 3000
const logger      = require('morgan')
const path        = require('path')
const KEY         = process.env.GOOGLEMAPTWO_KEY;

const mapApiRoute = require('./routes/map_route')
const incidentRoute   = require('./routes/incident_route')
// const homeRoute   = require('./routes/home_route')
// const apiRoute    = require('./routes/api_route')


app.use( logger( DEV ? 'dev' : 'common') );

app.use(express.static(path.join(__dirname, 'public')))




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('index', {googleKey: KEY});
  console.log(KEY, 'KEY');
})


app.use('/map', mapApiRoute);
app.use('/incident', incidentRoute)

app.listen(PORT, ()=> console.log("sever magic on ", PORT));
