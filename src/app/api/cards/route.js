import { NextResponse } from "next/server";
import {connectDB}  from "@/libs/mongodb";
import {VerbCard,NomenCard,NomenMUFCard,AndereCard} from '@/models/card';
import User from "@/models/user";

export async function POST(request) {
    const { type, wort, plural,manner,frau,frauen,prasens, prateritum, partizip2, bild, verwandte, beispiel, ubersetzung,userId } = await request.json()//Corresponde a recuperar el body

    try {
        await connectDB()
        const userFound=await User.findById(userId);
        if (userFound.email != process.env.RESEND_API_KEY) return NextResponse.json({message: "permission denied"},{status: 400})
        
        if(type === "Verb"){
            const wortFound = await VerbCard.findOne({ wort })
            if (wortFound) return NextResponse.json({message: "Dieses Wort existiert bereits"},{status: 400});
            const verbCard = new VerbCard({type,wort,prasens,prateritum,partizip2,bild,verwandte,beispiel,ubersetzung})
            const savedVerbCard = await verbCard.save();
            return NextResponse.json(savedVerbCard);
        }    
        else if(type === "Nomen-das" || type === "Nomen-die" || type === "Nomen-der" || type === "Nomen-pl"){
            const wortFound = await NomenCard.findOne({ wort })
            if (wortFound) return NextResponse.json({message: "Dieses Wort existiert bereits"},{status: 400});
            const nomenCard = new NomenCard({type,wort,plural,bild,verwandte,beispiel,ubersetzung})
            const savedNomenCard = await nomenCard.save();
            return NextResponse.json(savedNomenCard);
        } 
        else if(type === "Nomen-MUF"){
            const wortFound = await NomenMUFCard.findOne({ wort })
            if (wortFound) return NextResponse.json({message: "Dieses Wort existiert bereits"},{status: 400});
            const nomenMUFCard = new NomenMUFCard({type,wort,manner,frau,frauen,bild,verwandte,beispiel,ubersetzung})
            const savedNomenMUFCard = await nomenMUFCard.save();
            return NextResponse.json(savedNomenMUFCard);
        }    
        else{
            const wortFound = await AndereCard.findOne({ wort })
            if (wortFound) return NextResponse.json({message: "Dieses Wort existiert bereits"},{status: 400});
            const andereCard = new AndereCard({type,wort,bild,verwandte,beispiel,ubersetzung})
            const savedAndereCard = await andereCard.save();
            return NextResponse.json(savedAndereCard);
        }
    } catch (error) {
        return NextResponse.json({message: "Error"},{status: 400});
    }
}

export async function GET(){
    try {
        await connectDB();
        const allCards = await AndereCard.find({});
        return NextResponse.json(allCards);
    } catch (error) {
        return NextResponse.json(error);
    }
}