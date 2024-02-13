const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocoding')
const weatherstack = require('./utils/weather')
const port = process.env.PORT

// To initalize Express
const app = express() // Instance of an application

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



// console.log(path.join(__dirname,'../'));
// console.log(__dirname)
// console.log(__filename)


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Rishabh Pal'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title:'Help',
        help:'What type of help you need!',
        des: 'I will surely try to help as best as I can',
        name: 'Rishabh Pal'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: "About me",
        name: 'Rishabh Pal'
    })
})

app.get('/weather', (req, res) =>{

    if (!req.query.address) {
        return res.send({
            error:'No address was found'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if (error) {
            return res.send({
                error: error
            })
        }
        weatherstack(longitude,latitude,(error,forecastData) =>{
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        errorName:'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('error',{
        errorName:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up now on port: '+ port);
})
