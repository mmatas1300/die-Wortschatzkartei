const TrackerGrid = ({streak}) => {
    return(
        
        <div className="bg-light-green-800 flex">
            {
                streak.map((day)=>{
                    return(
                        <div className="m-1 bg-cyan-300">
                            {day.dayPlayed}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default TrackerGrid;