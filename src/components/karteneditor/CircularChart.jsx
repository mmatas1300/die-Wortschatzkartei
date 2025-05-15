import {  selectColorChart } from "@/libs/selectColorCards";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CircularChart = ({level,type})=>{

    const cardColorBlack = getComputedStyle(document.documentElement)
    .getPropertyValue('--black-card');

    const chartColor = getComputedStyle(document.documentElement)
    .getPropertyValue(selectColorChart(type));

    return (
        <CircularProgressbar value={100 * level / 7} strokeWidth={45} background backgroundPadding={5} styles={buildStyles({trailColor: cardColorBlack,  strokeLinecap: "butt" , backgroundColor: cardColorBlack, pathColor: chartColor})} />
    );
}

export default CircularChart;