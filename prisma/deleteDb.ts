import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAllData() {
try {
    await prisma.angkot.deleteMany({});
    await prisma.trayek.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.riwayatPerjalanan.deleteMany({});
    console.log('Semua data berhasil dihapus!');
} catch (error) {
    console.error('Gagal menghapus data:', error);
} finally {
    await prisma.$disconnect();
}
}

deleteAllData();
