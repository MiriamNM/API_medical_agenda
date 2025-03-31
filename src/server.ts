import 'dotenv/config';
import app from './app';
import mongoose from 'mongoose';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, SERVER_MESSAGES, APP_LOGO } from './utils/constants';
import migrateSchedules from './migrations/migrateSchedules';

const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI;

console.log(APP_LOGO);

const connectDB = async () => {
    if (!MONGODB_URI) throw new Error(ERROR_MESSAGES.URI_NOT_FOUND);

    try {
        await mongoose.connect(MONGODB_URI);
        console.log(SUCCESS_MESSAGES.CONNECTED);

        await migrateSchedules();
    } catch (error) {
        console.error(ERROR_MESSAGES.CONNECTION_ERROR, error);
        process.exit(1);
    }
};

const startServer = async () => {
    try {
        await connectDB();

        if (process.env.NODE_ENV !== 'production') {
            await migrateSchedules();
        }

        app.listen(PORT, () => {
            console.log(SERVER_MESSAGES.RUNNING(PORT));
        });
    } catch (err) {
        console.error(SERVER_MESSAGES.START_ERROR, err);
        process.exit(1);
    }
};

startServer().catch(err => {
    console.error(SERVER_MESSAGES.START_ERROR, err);
    process.exit(1);
});