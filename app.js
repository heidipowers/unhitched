'use strict'

const env         = process.env.NODE_ENV || 'development';
const DEV         = env==='development';
const dotenv      = (DEV) ? require('dotenv').config() : undefined;


const express     = require('express')
const app         = express()
const PORT        = process.env.PORT || 3000
const logger      = require('morgan')
const path        = require('path')

const mapApiRoute = require('./routes/map')
const addressRoute   = require('./routes/address')
// const homeRoute   = require('./routes/home_route')
// const apiRoute    = require('./routes/api_route')


app.use( logger( DEV ? 'dev' : 'common') );

app.use(express.static(path.join(__dirname, 'public')))
//app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('index');
})

app.use('/map', mapApiRoute);
app.use('/address', addressRoute)

app.listen(PORT, ()=> console.log("sever magic on ", PORT));
