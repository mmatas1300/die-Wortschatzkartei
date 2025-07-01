import { hexColor } from '@/utils/hexColors'
import { Award, Flame } from 'lucide-react'

const TrackerData = ({streak, streakFull}) => {

    const iconColorRed = hexColor.redCard;
    const iconColorOrange = hexColor.orangeCard;

    const currentStreak = ()=>{
        let currentStreak = 0;
        for (let i = 0; i<streak.length; i++){
            if(streak[i].cardsPlayed == 0)
                break;
            else
                currentStreak++;
        }
        return currentStreak;
    }

    const longestStreak = ()=>{
        if(!streakFull || streakFull.length === 0){
            return 0;
        }
    
        let longestStreak = 1;
        let secuence = 0;
    
        for( let i = 1; i<streakFull.length; i++){
            if( new Date(new Date(streakFull[i-1].lastPlayedDate).getFullYear(), new Date(streakFull[i-1].lastPlayedDate).getMonth(), new Date(streakFull[i-1].lastPlayedDate).getDate()).getTime()-new Date(new Date(streakFull[i].lastPlayedDate).getFullYear(), new Date(streakFull[i].lastPlayedDate).getMonth(), new Date(streakFull[i].lastPlayedDate).getDate()).getTime()  !== 86400000){
                longestStreak = Math.max(longestStreak, i-secuence);
                secuence = i;
            }
        }
        longestStreak = Math.max(longestStreak, streakFull.length-secuence)
        return longestStreak;
    }
    
    return (
        <div className="flex flex-row justify-center mt-1 text-sm gap-6">
            <div className='flex flex-row items-center gap-1'>
                {longestStreak() == 0 ? 
                    <>Längste Lernsträhne: keine </>:
                    longestStreak() == 1 ? 
                            <><Award color={iconColorOrange} /> Längste Lernsträhne: {longestStreak()} Tag</> :
                            <><Award color={iconColorOrange} /> Längste Lernsträhne: {longestStreak()} Tage</> }
            </div>
            <div className='flex flex-row items-center gap-1'>
                {currentStreak() == 0 ? 
                   <> Keine aktuelle Serie </>:
                   currentStreak() == 1 ? 
                        <><Flame color={iconColorRed} /> Lernsträhne: {currentStreak()} Tag</> :
                        <><Flame color={iconColorRed} /> Lernsträhne: {currentStreak()} Tage</> }
                
            </div>
        </div>
    );
}

export default TrackerData;