const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=5afc9013fb2315494558a69236f3eb09&query=' + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to weather services!", {})
        }else if (body.error){
            callback("Unable to find location, Try another search.", {})
        }else {
            callback(undefined,'It is currently ' + body.current.temperature + " degrees out, and it feels like " + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast