import { Award, Flame } from 'lucide-react'

const TrackerData = ({streak, streakFull}) => {

    const iconColorRed = getComputedStyle(document.documentElement)
        .getPropertyValue('--red-card');
    const iconColorOrange = getComputedStyle(document.documentElement)
        .getPropertyValue('--orange-card');

    let currentStreak = 0;
    for (let i = 0; i<streak.length; i++){
        if(streak[i].cardsPlayed == 0)
            break;
        else
            currentStreak++;
    }

    console.log(streakFull)
    let longestStreak=0;
    let daysPlayed = 0;
    for (let i = 0; i<streakFull.length-1; i++){
        console.log("lon",longestStreak)
        console.log("days",daysPlayed)
        if( new Date(new Date(streakFull[i].dayPlayed).getFullYear(), new Date(streakFull[i].dayPlayed).getMonth(), new Date(streakFull[i].dayPlayed).getDate()).getTime()-new Date(new Date(streakFull[i+1].dayPlayed).getFullYear(), new Date(streakFull[i+1].dayPlayed).getMonth(), new Date(streakFull[i+1].dayPlayed).getDate()).getTime()  > 86400000){
            //Interrupción
            longestStreak = longestStreak < daysPlayed ? daysPlayed + 1 : longestStreak + 1;
            daysPlayed = 0;
        }
        else{
            //Racha
            daysPlayed++
        }

    }
    
    return (
        <div className="flex flex-row justify-center mt-1 text-sm gap-6">
            <div className='flex flex-row items-center gap-1'>
                {longestStreak == 0 ? 
                    <> Keine </>:
                    longestStreak == 1 ? 
                            <><Award color={iconColorOrange} /> Längste Lernsträhne: {longestStreak} Tag</> :
                            <><Award color={iconColorOrange} /> Längste Lernsträhne: {longestStreak} Tage</> }
            </div>
            <div className='flex flex-row items-center gap-1'>
                {currentStreak == 0 ? 
                   <> Keine aktuelle Serie </>:
                   currentStreak == 1 ? 
                        <><Flame color={iconColorRed} /> Lernsträhne: {currentStreak} Tag</> :
                        <><Flame color={iconColorRed} /> Lernsträhne: {currentStreak} Tage</> }
                
            </div>
        </div>
    );
}

export default TrackerData;