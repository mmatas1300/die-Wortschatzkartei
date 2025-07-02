import { hexColor } from "@/utils/hexColors";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CircularChart = ({level, type})=>{

    const chartColor = (type)=>{
        switch (type) {
            case "NeuterNoun":
                return hexColor.greenCard;
            case "MasculineNoun":
                return hexColor.blueCard;
            case "FeminineNoun":
                return hexColor.redCard;
            case "PluralNoun":
                return hexColor.yellowCard;
            case "MFNoun":
                return hexColor.purpleMFCard;
            case "Verb":
                return hexColor.orangeCard;
            default:
                return hexColor.purpleCard;
        }
        
    };

    return (
        <CircularProgressbar value={100 * level / 7} strokeWidth={45} background backgroundPadding={5} styles={buildStyles({trailColor: hexColor.blackCard,  strokeLinecap: "butt" , backgroundColor: hexColor.blackCard, pathColor: chartColor(type)})} />
    );
}

export default CircularChart;