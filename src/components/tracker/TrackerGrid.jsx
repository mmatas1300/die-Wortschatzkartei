const TrackerGrid = ({ streak }) => {

    const gridDays = new Array(120);
    const streakReverse = streak.toReversed();

    for (let i = 0; i < gridDays.length; i++) {
        gridDays[i] = { date: new Date(), cardsPlayed: 0 };
        gridDays[i].date = new Date(gridDays[i].date.setDate(gridDays[i].date.getDate() - i));
    }

    gridDays.forEach((gridDay) => {
        for (let i = 0; i < streakReverse.length; i++) {

            const streakDayDate = new Date(streakReverse[i].dayPlayed);
            const gridDayDate = new Date(gridDay.date);

            if(streakDayDate<gridDays[gridDays.length-1].date){
                break;
            }

            if( gridDayDate.getFullYear() == streakDayDate.getFullYear() & gridDayDate.getDate() == streakDayDate.getDate() & gridDayDate.getMonth() == streakDayDate.getMonth() ){
                gridDay.cardsPlayed = streakReverse[i].cardsPlayed;
                break;
            }
        }
    })

    return (

        <div className="bg-light-green-800 flex">
            {
                gridDays.map((day) => {
                    return (
                        <div className="m-1 bg-cyan-300">
                            {day.cardsPlayed}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default TrackerGrid;