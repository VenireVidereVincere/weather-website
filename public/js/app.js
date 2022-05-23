const weatherForm = document.querySelector("form")
const searchButton = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")



weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    messageOne.textContent = ""
    messageTwo.textContent = ""

    const location = searchButton.value;
    messageOne.textContent = "Loading ... "
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            console.log(data.forecastData)
            messageTwo.textContent = "The current temperature outside is "+data.forecastData.temperature+"ºC, it feels like "+data.forecastData.feelsLike+"ºC and there's a "+data.forecastData.rainChance+"% chance of it raining today."
        }
    })
})

})