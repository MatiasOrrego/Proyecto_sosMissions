import { createConnection } from "mysql2/promise";

export const newConnection = async () => {
    return await createConnection({
        host:"localhost",
        user: "root",
        password: '',
        database: "sosmissions"
    })
}

import  mongoose  from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/sosmissions', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
}