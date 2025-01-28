import express from 'express';
import { PrismaClient } from '@prisma/client';
import cookieParser from "cookie-parser";
import authRoute from './routes/authRoutes.js';
import angkotRoute from './routes/angkotRoutes.js';
import userRoutes from './routes/userRoute.js';
import trayekRoutes from './routes/trayekRoutes.js';
import supirRoutes from './routes/supirRoute.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/', angkotRoute);
app.use('/api/v1/supir', supirRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/trayek', trayekRoutes);

const checkDbConnection = async () => {
    try {
        await prisma.$connect();
        console.log('DB Tersambung');
    } catch (error) {
        console.error('Gagal tersambung ke DB:', error);
    }
};

checkDbConnection();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
