import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from '@/app/api/_models/user';

export async function POST(request, { params }) {
    const { userId } = await request.json()
    try {
        await connectDB();
        const userFound = await User.findOne({ _id: userId });
        if (params.query[0] === "search") {
            const regExp = new RegExp(`.*${params.query[1].toLowerCase()}.*`);
            const filterCards = userFound.myCards.filter((card) => {
                return regExp.test(card.wort.toLowerCase()) || regExp.test(card.beispiel.toLowerCase()) || regExp.test(card.verwandte.toLowerCase())
            });
            return NextResponse.json(filterCards);
        } else {
            const regExpFirstLetter = new RegExp("^" + params.query[0].toLowerCase());
            const filterCards = userFound.myCards.filter((card) => {
                return regExpFirstLetter.test(card.wort.toLowerCase());
            });
            if (params.query[0].toLowerCase() === "a" || params.query[0].toLowerCase() === "u" || params.query[0].toLowerCase() === "o") {
                let regExpFirstLetterUmlaut;
                if(params.query[0].toLowerCase()==="a"){
                    regExpFirstLetterUmlaut = new RegExp("^ä");
                } else if(params.query[0].toLowerCase()==="o"){
                    regExpFirstLetterUmlaut = new RegExp("^ö");
                } else if(params.query[0].toLowerCase()==="u"){
                    regExpFirstLetterUmlaut = new RegExp("^ü");
                }
                const umlautCards = userFound.myCards.filter((card) => {
                    return regExpFirstLetterUmlaut.test(card.wort.toLowerCase());
                });
                return NextResponse.json(filterCards.concat(umlautCards));
            }
            return NextResponse.json(filterCards);
        }
    } catch (error) {
        return NextResponse.json(error);
    }
}