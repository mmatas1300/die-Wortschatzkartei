import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';

export default function AutohideSnackbar({ message, color, trigger}) {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        if(count != 0)
            setOpen(true);
        setCount(count+1);
    },[trigger])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div data-test='Notification'>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '5px',
                        backgroundColor: color,
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "inherit"
                    },
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={message}
            />
        </div>
    );
}