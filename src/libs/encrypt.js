import CryptoJS from "crypto-js";

export const encrypt = (message,key)=>{
        return CryptoJS.AES.encrypt(message, key).toString();
}