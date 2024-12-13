import express from 'express';
import { PrismaClient } from '@prisma/client';

import authRoute from './routes/authRoutes.js';
import angkotRoute from './routes/angkotRoutes.js';
import userRoutes from './routes/userRoute.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/', angkotRoute);
app.use('/api/v1/user', userRoutes);

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
