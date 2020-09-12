const req = require('request')

const geoCode = (address,callback) => {
    const geocodeURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoic3VqaWxhc3UiLCJhIjoiY2tlc2Z2dGdwMnphaDJxcGlkZ3d0Y2R4ciJ9.XZeD-xV5E0nn4dGwZDdPtw"
    req({url : geocodeURL, json:true},(error,{body}={}) => {
        if(error){
            callback("Unable to coonect",undefined)
        }
        else if(body.features.length === 0){
            callback("Unable to connect, since the location given is invalid",undefined)
        }else{
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            callback(undefined,{longitude, latitude})
        }       
    })
 }
 module.exports = geoCode