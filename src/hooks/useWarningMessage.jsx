import { useState } from "react";

export const useWarningMessage = ()=>{
    const [warningMessage, setWarningMessage] = useState("");
    const [warningTrigger, setWarningTrigger] = useState(false);
    const [warningColor, setWarningColor] = useState(false);
    const showWarning = (message, color = null)=>{
        setWarningMessage(message);
        setWarningColor(color);
        setWarningTrigger(!warningTrigger);
    };
    return [warningMessage,warningTrigger,warningColor,showWarning];
}