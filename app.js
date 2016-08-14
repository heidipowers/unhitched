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

const timelineRoute = require('./routes/timeline_route')
const incidentRoute   = require('./routes/incident_route')
//const adminRoute    = require('./routes/user')


app.use( logger( DEV ? 'dev' : 'common') );

app.use(express.static(path.join(__dirname, 'public')))




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('index', {googleKey: KEY});
  console.log(KEY, 'KEY');
})


app.use('/timeline', timelineRoute);
app.use('/incident', incidentRoute);
//app.use('/update', adminRoute);

app.listen(PORT, ()=> console.log("sever magic on ", PORT));
