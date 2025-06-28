import { useState } from "react";

export const useNotification = ()=>{
    const [message, setMessage] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [color, setColor] = useState(false);
    const showNotification = (message, color = null)=>{
        setMessage(message);
        setColor(color);
        setTrigger(!trigger);
    };
    return [message,trigger,color,showNotification];
}