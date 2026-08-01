import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
}

export async function disconnectDB() {
    await mongoose.disconnect();
}
