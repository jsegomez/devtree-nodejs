import mongoose from 'mongoose';

const database = async () => {
    try {        
        await mongoose.connect(process.env.MONGO_URI!);
    } catch (error) {
        console.log('Database connection error', error);
        process.exit(1);
    }
}

export default database;






