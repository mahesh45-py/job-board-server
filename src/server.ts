import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { jobRouter } from "./job.routes";


dotenv.config();

const {ATLAS_URI} = process.env


if(!ATLAS_URI){
    console.error("No ATLAS_URI variable has been found in config.env");
    process.exit();

}

connectToDatabase(ATLAS_URI).then(()=>{
    const app = express()

    app.use(cors())

    app.use("/jobs",jobRouter);
    
    app.get("/", (req, res) => {
        res.send("Welcome to the Job API");
    });
    
    
    //start the Express Server
    app.listen(5200,()=>{
        console.log("Server started running on http://localhost:5200")
    })
}).catch((err)=>{
    console.error(err)
})