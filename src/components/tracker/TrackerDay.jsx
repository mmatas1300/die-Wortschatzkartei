
const TrackerDay = ({day,mostPlayed})=>{

    const setOpacity = ()=>{
        const opacity = mostPlayed == 0 ? 0.5 : 0.5*day.cardsPlayed/mostPlayed + 0.5
        return opacity;
    }


    return(
        <div className={`bg-blue-card ${"opacity-["+setOpacity()+"]"} rounded-sm p-2 lg:p-3`}>
            
        </div>
    );
}

export default TrackerDay;