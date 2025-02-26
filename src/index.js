import express from 'express';
import { PrismaClient } from '@prisma/client';
import cookieParser from "cookie-parser";
import authRoute from './routes/authRoutes.js';
import angkotRoute from './routes/angkotRoutes.js';
import userRoutes from './routes/userRoute.js';
import trayekRoutes from './routes/trayekRoutes.js';
import supirRoutes from './routes/supirRoute.js';
import { syncAngkotLocation } from "./service/angkotScheduler.js";
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/angkot', angkotRoute);
app.use('/api/v1/supir', supirRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/trayek', trayekRoutes);

syncAngkotLocation();

const checkDbConnection = async () => {
    try {
        await prisma.$connect();
        console.log('DB Tersambung');
    } catch (error) {
        console.error('Gagal tersambung ke DB:', error);
    }
};

checkDbConnection();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
