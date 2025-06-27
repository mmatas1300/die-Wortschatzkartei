import { NextResponse } from "next/server";
import { getWordByQuery } from "@/app/api/_services/ponsService";

export async function POST(req) {
    const { userId, query } = await req.json();
    try {
        const wordData = await getWordByQuery(userId, query)
        return NextResponse.json({data: wordData},{status:200});
    } catch (error) {
        return NextResponse.json({message: error.message},{status:400});
    }
}