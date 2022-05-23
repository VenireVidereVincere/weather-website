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
                temperature:body.current.temperature,
                feelsLike: body.current.feelslike,
                rainChance: body.current.precip
            })    
        }
    })
}
module.exports= forecast