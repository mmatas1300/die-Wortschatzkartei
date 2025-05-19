import { useState } from "react";

export const useWarningMessage = ()=>{
    const [warningMessage, setWarningMessage] = useState("");
    const [warningTrigger, setWarningTrigger] = useState(false);
    const showWarning = (message)=>{
        setWarningMessage(message)
        setWarningTrigger(!warningTrigger);
    };
    return [warningMessage,warningTrigger,showWarning];
}