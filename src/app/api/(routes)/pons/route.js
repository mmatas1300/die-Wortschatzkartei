import { NextResponse } from "next/server";
import { getWordByQuery } from "@/app/api/_services/ponsService";

export async function POST(req) {
    const { userId, query } = await req.json();
    try {
        const data = await getWordByQuery(userId, query)
        return NextResponse.json({data: data, ok: true});
    } catch (error) {
        return NextResponse.json({message: error, ok: false});
    }
}