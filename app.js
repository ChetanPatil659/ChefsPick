import express from "express";
import dbConnect from "./src/config/db.js";
import baseRouter from "./src/routes/index.js";
import cors from "cors";
import 'dotenv/config'

const app = express()


app.use(express.json())
app.use(cors())

app.listen('8000', ()=>{
  console.log('server started at 8000')
})

dbConnect()

app.use('/api', baseRouter)

//listen unhandleRejection
process.on('unhandledRejection', (reason, p) => {
    //get slack notification about the error  
      console.error('Unhandled Rejection at:', p, 'reason:', reason)
    server.close()
    process.exit(1)
  });
  process.on('uncaughtException', (e) => {
    console.error('Uncaught exception at:', e)
    
    server.close()
    process.exit(1)
  });