import { Spinner } from "@material-tailwind/react";

const LoadingButton = ({ children, buttonStyle = "", spinnerStyle = "mt-2.5 h-[41px] w-[41px]", isLoading }) => {

    return (<>
        {isLoading ?
            (<Spinner className={spinnerStyle} />) : (<button className={buttonStyle}>{children}</button>)}
    </>)
}

export default LoadingButton;