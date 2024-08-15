import express, { urlencoded } from "express"
import cors from "cors"
import {HOST, PORT} from './src/config/secret.js'

const app=express()

//middleware
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors({
    origin:true,
    allowedHeaders:true,
    credentials:true
}))



//application route
import appRouter from './src/route/index.js'
import userController from "./src/api/user/userController.js"
import { isAuth } from "./src/middleware/auth.js"
app.post("/api/user/login",userController.login)
app.use("/api",[isAuth],appRouter) //[isAuth]

// test route
app.get("/",(req,res,next)=>{
    return res.status(200).json({
        sucess:true,
        message:"test"
    })
})

// listening server

app.listen(PORT,HOST,(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log(`server is running at http://${HOST}:${PORT}`)
    }
})
