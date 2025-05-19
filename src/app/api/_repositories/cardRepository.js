import { connectDB } from "@/services/mongodb";
import { AndereCard } from "@/app/api/_models/card";

export const cardFindAll = async () => {
    await connectDB();
    return await AndereCard.find({});
};

export const cardFindByQuery = async (query) => {
    await connectDB();
    return await AndereCard.find({
        $or: [
            { wort: { $regex: query, $options: 'i' } },
            { beispiel: { $regex: query, $options: 'i' } },
            { verwandte: { $regex: query, $options: 'i' } },
        ]
    });
};