import CryptoJS from "crypto-js";

export const encrypt = (message,key)=>{
        return CryptoJS.AES.encrypt(message, key).toString();
}

export const decrypt = (message,key)=>{
        return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
}