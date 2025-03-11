import { NextResponse } from "next/server";

export async function POST(req){

    const { query } = await req.json();

    const URL = `https://api.pons.com/v1/dictionary?q=${query}&l=deen&in=de&language=en`;
    try {
        const resp = await fetch(URL,
            {
                headers: {
                    "X-Secret": process.env.PONS_KEY,
                }
            }
        )
        const data = await resp.json()
        return NextResponse.json(data);
    } catch (error) {
        console.loh(error);
    }
}