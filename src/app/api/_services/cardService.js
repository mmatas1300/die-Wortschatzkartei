import { cardFindAll } from "@/app/api/_repositories/cardRepository";

export const getAllAppCards = async ()=>{
    return await cardFindAll();
};