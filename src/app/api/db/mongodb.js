import mongoose from "mongoose";

export const connectDB = async () => {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        if(connection.readyState === 1)
            return Promise.resolve(true);
        return Promise.reject.resolve(false);
};