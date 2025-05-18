import { NextResponse } from "next/server";
import { getWordByQuery } from "@/app/api/_services/ponsService";

export async function POST(req) {
    const { userId, query } = await req.json();
    try {
        const data = getWordByQuery(userId, query)
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
    }
}