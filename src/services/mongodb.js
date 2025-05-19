import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        if(connection.readyState === 1){
            return Promise.resolve(true);
        } 
    } catch (error) {
        console.log(error)
        return Promise.reject(false);
    }
};