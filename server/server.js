const express = require('express')
const path = require('path')
const errorHandler = require('./middlewares/errorHandler.js')
const {logger} = require('./middlewares/logger.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()



const PORT = process.env.PORT|| 3500

app.use(logger)

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use('/',express.static(path.join(__dirname,'public')))

app.use('/',require('./routes/routes.js'))

app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.json({message : "not found"})
    }else{
        res.type('txt').send('404 not found')
    }
})

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Running On Port : ${PORT}`)
})