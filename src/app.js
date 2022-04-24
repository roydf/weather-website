const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Roy Schiff'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Roy Schiff'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'If you need help good luck!',
        title: 'Help',
        name: 'Roy Schiff'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error: 'You must provide an adress.'
        })
    }
    geoCode(req.query.adress,(error, {latitude, longitude, location}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({ error })
            }
            
            res.send({
                adress: req.query.adress,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Help page not found!' 
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
