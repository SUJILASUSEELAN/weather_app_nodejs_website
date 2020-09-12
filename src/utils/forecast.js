const req = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude +'&lon=' +longitude + '&appid=f7d1b96528345acd25c4261f514a66ce'
        req({url,json:true},(error,{body})=>{
            if(error){
                callback("Unable to connect",undefined)
            }
            else if(body.message){
                callback("Location Invalid",undefined)
            }
            else{
                const{name} = body
                callback(undefined,body.weather[0].description +". Temperature of "+name+" is "+body.main.temp+" degree")
            }
              
        })
}
module.exports = forecast