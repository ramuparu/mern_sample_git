const {format} = require('date-fns')

const {v4:uuid} = require('uuid')

const path = require('path')

const fsPromises = require('fs').promises

const fs = require('fs')

const logEvents = async (message,logFileName)=>{
    const dateformat = `${format(new Date(),'yyyyMMdd\tHH:MI:SS')}`
    const logItem = `${dateformat}\t${uuid}\t${message}\n`
    try {
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logFileName),logItem)
    } catch (error) {
        console.log(error)
    } 
}

const logger = (req,res,next)=>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqLog.log')
    console.log(`${req.method}\t${req.path}`)
    next()
}

module.exports = {logger,logEvents}