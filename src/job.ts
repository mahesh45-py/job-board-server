import * as mongodb from "mongodb";

export interface Job{
    title:string;
    position:string;
    company:string;
    experience:string;
    level: "Fresher" | "Junior" | "Senior" | "Lead" | "Architect";
    description:string;
    salary?:string;
    _id?:mongodb.ObjectId;
}