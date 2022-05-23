const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Defining Paths for Express Config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

// Express Settings - Using hbs Engine.
app.set("views",viewsPath)
app.set("view engine","hbs")
hbs.registerPartials(partialsPath)

// Setting static directory to serve - /public 
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        title: "Weather App",
        name: "Alan Jurado"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        helpText:"Get help",
        title: "Help",
        name: "Alan Jurado"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title: "About Me",
        name: "Alan Jurado"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"An address must be provided"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData,
                address:req.query.address
            })
        })
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404helparticle",{
        title:"404",
        name:"Alan Jurado",
        errorMessage:"Help Article Not Found"
    })
})

app.get("*",(req,res)=>{
    res.render("404generic",{
        title:"404",
        errorMessage:"Page not Found",
        name:"Alan Jurado"
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})