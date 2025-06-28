import AutohideSnackbar from "@/components/Snackbar";
import { useNotification } from "@/hooks/useNotification";

import { createContext } from "react";

export const AlertMessageContext = createContext();

export const AlertMessageContextProvider = ({ children }) => {

    const [message,trigger,color,showNotification] = useNotification();

    const data = { showNotification };

    return (
        
        <AlertMessageContext.Provider value={data}>
            <AutohideSnackbar message={message} color={color} trigger={trigger}/>
            {children}
        </AlertMessageContext.Provider>
    )
}