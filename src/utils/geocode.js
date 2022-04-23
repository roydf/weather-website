const request = require('request')

const geoCode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiYXRvbWljamFyIiwiYSI6ImNsMjZjNXFsYTJpNGozaWxwMWVhMWE1ZjkifQ.V11WflzHr5YeGcvgDWpydw&limit=1'
    request({ url, json: true}, (error, {body: {features}}) => {
        if(error) {
            callback('Unable to connect to location services!', {})
        }else if (features.length === 0) {
            callback('Unable to find loctain. Try another search.', {})
        }else {
            callback(undefined, {
                latitude : features[0].center[1],
                longitude : features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geoCode

