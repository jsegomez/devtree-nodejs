import mongoose from 'mongoose';

const database = async () => {
    try {        
        const { connection } = await mongoose.connect(process.env.MONGO_URI!);
        const url = `${connection.host}:${connection.port}`;        
    } catch (error) {
        console.log('Database connection error', error);
        process.exit(1);
    }
}

export default database;






