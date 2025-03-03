import TrackerDay from "./TrackerDay";

const TrackerGrid = ({ streak }) => {

    let mostPlayed = 0;

    console.log(streak)
     
    for (let i = 0; i<streak.length ; i++ ){
        mostPlayed = streak[i].cardsPlayed > mostPlayed ? streak[i].cardsPlayed : mostPlayed;
    }

    return (

        <div className="bg-orange-card p-3 rounded-lg grid grid-flow-col grid-rows-7 gap-1">
            
            {   
                streak.toReversed().map((day) => {
                    return (
                        <TrackerDay key={day.date} day={day} mostPlayed={mostPlayed}/>
                    )
                })
            }
        </div>
    );
}

export default TrackerGrid;