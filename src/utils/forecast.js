const request = require("request");

const forecast=(longitude,latitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=3c1a0b7682f389289e564b0c534a7977&query="+latitude+","+longitude+"&units=m"
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to contact weather services!",undefined)
        } else if(body.error){
            callback("Location not supported or not found!",undefined)
        } else{
            callback(undefined,{
                icon:body.current.weather_icons[0],
                humidity:" with "+body.current.humidity+"% of humidity in the air.",
                description:"It will be "+body.current.weather_descriptions[0] + " outside throughout the day",
                temperature:" with a temperature of " +body.current.temperature +"ºC.",
                feelsLike: "It might feel like " +body.current.feelslike+ "ºC due to the weather conditions, ",
                rainChance: "and there is a "+body.current.precip+"% chance of it raining"
            })    
        }
    })
}
module.exports= forecast