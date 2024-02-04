const request = require('request')

const weatherstack = (longitude, latitude, callback)=>{
    // console.log(latitude, longitude);
    const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=546e802ccb7b403880b76e079c2aae09&include=minutely`

    request({url: url, json: true}, (error, response) =>{
        // console.log(response.body)
        if (error) {
            callback('Unable to get the server!',undefined)
        } else if (response.body.success === false) {
            callback('Unable to fetch. Try again.',undefined)
        } else {
            callback(undefined, response.body.data[0].weather.description + ' It is currently ' + response.body.data[0].temp + ' degress out. There is a ' + response.body.data[0].precip + '% chance of rain.')
        }
    })
}

module.exports = weatherstack