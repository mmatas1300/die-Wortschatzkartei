import {AndereCard} from '@/app/api/_models/card';
import {connectDB}  from "@/libs/mongodb";

export const progressGenerator = async ()=>{
    try {
        await connectDB();
        const cards = await AndereCard.find({});
        const progress = cards.map((card)=>{
            return {cardId: card._id, level:0, practiceDate: new Date("2000")}
        });
        return progress;
    } catch (error) {
        console.log(error);
    }
};