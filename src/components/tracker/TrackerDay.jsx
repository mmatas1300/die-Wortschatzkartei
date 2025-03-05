import { useState } from 'react';

const TrackerDay = ({ day, mostPlayed }) => {

    const [showTooltip, setShowTooltip] = useState(false);

    const setOpacity = () => {
        const opacity = mostPlayed == 0 ? 50 : 50 * day.cardsPlayed / mostPlayed + 50;
        return opacity;
    }

    const setColor = () => {
        const color = day.cardsPlayed == 0 ? "bg-black-card/[var(--day-opacity)]" : "bg-green-card/[var(--day-opacity)]"
        return color;
    }

    const getMonthName = (monthIndex, locale) => {
        const date = new Date();
        date.setMonth(monthIndex);
        const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });
        return formatter.format(date);
    }

    return (
        <div style={{ "--day-opacity": setOpacity() / 100 }}>
            <div className={`${setColor()} rounded-sm p-2 lg:p-3 relative`} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>

                {showTooltip && (
                    <div
                        className="absolute bg-black-card text-white text-xs p-2 rounded-md z-10"
                        style={{ top: '110%', left: '50%', transform: 'translateX(-50%)' }}
                    >
                        {`${day.cardsPlayed} Karten wiederholt am ${day.date.getDate()}. ${getMonthName(day.date.getMonth(), 'de-DE')} ${day.date.getFullYear()}`}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TrackerDay;