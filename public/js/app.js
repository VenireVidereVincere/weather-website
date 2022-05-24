const weatherForm = document.querySelector("form")
const searchButton = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")
const weatherIcon = document.querySelector("#weather-icon")


weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    messageOne.textContent = ""
    messageTwo.textContent = ""

    const location = searchButton.value;
    messageOne.textContent = "Loading ... "
    fetch("/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        } else {
            weatherIcon.src = data.forecastData.icon
            messageOne.textContent = data.location 
            console.log(data.forecastData)
            messageTwo.textContent = data.forecastData.description+data.forecastData.temperature
            messageThree.textContent=data.forecastData.feelsLike+data.forecastData.rainChance+data.forecastData.humidity
            
        }
    })
})

})