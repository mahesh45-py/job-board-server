import * as express from "express"
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const jobRouter = express.Router();
jobRouter.use(express.json())


jobRouter.get("/", async(_req,res)=>{
    try{
        const jobs = await collections?.jobs?.find({}).toArray();
        res.status(200).send(jobs)
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error")
    }
})

jobRouter.get("/:id", async(req,res)=>{
    try{
        const id = req?.params?.id;
        const query = {_id: new ObjectId(id)}
        const job = await collections?.jobs?.findOne(query)
        if(job){
            res.status(200).send(job)
        }else{
            res.status(404).send(`Failed to find Job ID:${id}`)
        }
        
    }catch(error){
        res.status(500).send(error instanceof Error ? error.message : "Unknown error")
    }
})

jobRouter.post("/", async(req,res)=>{
    try{
        const job = req.body;
        const result = await collections?.jobs?.insertOne(job);

        if(result?.acknowledged){
            res.status(201).send(`Created a new Job: Id ${result.insertedId}`)
        }else{
            res.status(500).send("Failed to create a new Job")
        }
    }catch(error){
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message : "Unknown error")
    }
})

jobRouter.put("/:id",async(req,res)=>{
    try{
        const id = req?.params?.id;
        const query = {_id: new ObjectId(id)}
        const job = req.body;

        const result = await collections?.jobs?.updateOne(query,{$set:job})

        if(result && result.matchedCount){
            res.status(200).send(`Updated a Job : ID ${id}`)
        }else if (!result?.matchedCount){
            res.status(404).send(`Failed to find a Job: ID ${id}`)
        }else{
            res.status(304).send(`Failed to update a Job :ID ${id}`)
        }

    } catch(error){
        const message = error instanceof Error ? error.message : "Unknown error"
        console.error(message)
        res.status(400).send(message)
    }
})

jobRouter.delete("/:id", async(req,res)=>{
    try{
        const id = req?.params?.id;
        const query = {_id: new ObjectId(id)}
        const result = await collections?.jobs?.deleteOne(query);
        
        if(result && result.deletedCount){
            res.status(202).send(`Removed a job : ID ${id}`)
        }else if(!result){
            res.status(400).send(`Failed to delete a job: ID ${id}`)
        }else{
            res.status(404).send(`Failed to find a job : ID ${id}`)
        }
    }catch(error){
        const message = error instanceof Error ? error.message : "Unknown error"
        console.error(message)
        res.status(400).send(message)
    }
})