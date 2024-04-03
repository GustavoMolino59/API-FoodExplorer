require("express-async-errors")
require('dotenv/config')
const database = require('./database')
const express = require("express")
const cors = require('cors')
const routes = require('./routes')
const AppError = require('./utils/AppError')
const { Database } = require("sqlite")
const uploadConfig = require('./configs/upload')
const cookieParser = require("cookie-parser")



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: [process.env.REQUISITION_URL, "http://127.0.0.1:5173"],
  credentials: true
}));

//Tenta
app.use(routes)
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))

app.use((error, request, response, next) =>{
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      message: error.message,
      status: error.statusCode
    })

    
  }
  return response.status(500).json({
    message:"error",
    status: "Internal server error"
  })
})

const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))