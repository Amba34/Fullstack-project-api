import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
import cors from "cors"





const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
        
    } catch(error){
        throw error;
    }
}

//middlewares
   app.use(cors({
     origin: [
       "https://fullstack-project-admin-mu.vercel.app",
       "https://fullstack-project-client.vercel.app",
         "http://localhost:3000"
     ],
     credentials: true
   }));

app.use(cookieParser());

//1st viste
// app.use((req,res,next) => {
//     console.log("Hay i am a middleware");
//     next() // allowing to go to next middlewere
// })
app.use(express.json());

app.use("/api/auth" , authRoute);
app.use("/api/users" , usersRoute);
app.use("/api/hotels" , hotelsRoute);
app.use("/api/rooms" , roomsRoute);

app.use((err,req,res,next) => {

    const errorStatus = err.status || 500
    const errorMessage = err.message || "Somwthing Went Wrong"

    return res.status(errorStatus).json({
        sussess : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack,
    })
})

    app.listen(process.env.PORT , () => {
        connect();
        console.log("Connected to backend");
})
