import * as mongodb from "mongodb";
import { Job } from "./job";

export const collections:{
    jobs?:mongodb.Collection<Job>;
}  = {};

export async function connectToDatabase(uri:string) {
    const client = new mongodb.MongoClient(uri)
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db)

    const jobsCollection = db.collection<Job>("jobs")
    collections.jobs = jobsCollection;
}


async function applySchemaValidation(db:mongodb.Db){
    const jsonSchema = {
        $jsonSchema:{
            bsonType: "object",
            required: ["title", "position", "company", "experience", "level", "description"],
            additionalProperties:true,
            properties:{
                _id:{},
                title:{
                    bsonType: "string",
                    description:"'Title' is a required field"
                },
                position:{
                    bsonType: "string",
                    description:"'position' is a required field"
                },
                company:{
                    bsonType: "string",
                    description:"'company' is a required field"
                },
                experience:{
                    bsonType: "string",
                    description:"'experience' is a required field"
                },
                level:{
                    bsonType: "string",
                    description:"'level' is a required field",
                    enum:["Fresher", "Junior", "Senior", "Lead", "Architect"]
                },
                description:{
                    bsonType: "string",
                    description:"'description' is a required field",
                    minLength:100
                },
                salary:{
                    
                }
            }
        }
    }
}