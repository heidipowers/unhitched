const express     = require('express')
const app         = express()
const PORT        = process.env.PORT || 3000
const logger      = require('morgan')
const path        = require('path')

const mapRoute = require('./routes/map')
// const userRoute   = require('./routes/user_route')
// const homeRoute   = require('./routes/home_route')
// const apiRoute    = require('./routes/api_route')


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')))
//app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('index');
})

app.get('/map', mapRoute);

app.listen(PORT, ()=> console.log("sever magic on ", PORT));
