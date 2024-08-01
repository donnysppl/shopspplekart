import mongoose from "mongoose";

// Increase the max listeners limit
mongoose.connection.setMaxListeners(10);

export async function connect() {
    if (mongoose.connection.readyState >= 1) {
        // If already connected, just return
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        // Ensure listeners are not added multiple times
        if (connection.listeners('connected').length === 0) {
            connection.on('connected', () => {
                console.log('MongoDB connected successfully');
            });
        }

        if (connection.listeners('error').length === 0) {
            connection.on('error', (err) => {
                console.log('MongoDB connection error', err);
                process.exit(1);
            });
        }

    } catch (error) {
        console.log('Something went wrong!', error);
    }
}