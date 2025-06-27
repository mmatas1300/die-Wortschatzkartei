import { connectDB } from "@/app/api/db/mongodb";
import { Card } from "@/app/api/_models/card";

export const cardFindAll = async () => {
    await connectDB();
    return await Card.find({});
};

export const cardFindByQuery = async (query) => {
    await connectDB();
    return await Card.find({
        $or: [
            { word: { $regex: query, $options: 'i' } },
            { example: { $regex: query, $options: 'i' } },
            { related: { $regex: query, $options: 'i' } },
        ]
    });
};