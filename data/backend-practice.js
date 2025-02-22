let data = new XMLHttpRequest()

data.addEventListener(`load`,()=>{
    console.log(data.response)
})

data.open(`GET`,`https://supersimplebackend.dev` )
data.send()
