import mongoose, { Mongoose } from "mongoose";

type ConnectionObject = {
    isConnected?: number
}
const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to Database")
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        console.log(`DATABASE: ${db}`)
        console.log(`DB.CONNECTION: ${db.connection}`)
        connection.isConnected = db.connections[0].readyState
        console.log("DB CONNECTED SUCCESSFULLY");

    } catch (error) {
        console.log("DATABASE CONNECTION FAILED", error)
        process.exit(1)
    }

}

export default dbConnect;  