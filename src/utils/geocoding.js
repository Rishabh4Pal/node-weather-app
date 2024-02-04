const request = require('request')


const geocode = (address, callback) => {
    const locationUrl = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGFscmlzaGFiaDM0MiIsImEiOiJjbHM1b3ZocGoxa2JuMmtvM2JjNnYwbDF4In0.u2XS4KvkyyTRVTJGXjLlYw&limit=1`

    request({ url: locationUrl, json: true }, (error, response) => {
        if (error) {
            callback(`Unable to connect to the server!`, undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode