import { connectDB } from "@/libs/mongodb";
import { AndereCard } from "@/app/api/_models/card";

export const cardFindAll = async ()=>{
    await connectDB();
    return await AndereCard.find({});
};