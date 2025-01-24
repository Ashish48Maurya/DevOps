import mongoose from 'mongoose'
async function mongoConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection Successful...");
    } catch (err) {
        console.error(err);
        throw new Error("MongoDB connection error");
    }
}

export default mongoConnect;