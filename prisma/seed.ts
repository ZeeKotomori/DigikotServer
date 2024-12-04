import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed User
  const user = await prisma.user.create({
    data: {
      name: "Udin",
      email: "udin@gmail.com",
      password: "udinPetot",
      role: "u",
      nomorKendaraan: " ",
    },
  });

  // Seed Trayek 1: Cicaheum - Kebon Kelapa
  const trayek1 = await prisma.trayek.create({
    data: {
      namaTrayek: "ABDUL MUIS (Kebon Kelapa) → CICAHEUM via BINONG",
      lokasiAwal: "Terminal Kebon Kelapa",
      lokasiAkhir: "Terminal Cicaheum",
      rute: JSON.parse(
        JSON.stringify([
          { namaJalan: "Terminal Kebon Kelapa" },
          { namaJalan: "Jalan Pungkur" },
          { namaJalan: "Jalan Karapitan" },
          { namaJalan: "Jalan Buah Batu" },
          { namaJalan: "Jalan Banteng" },
          { namaJalan: "Jalan Sancang" },
          { namaJalan: "Jalan Lodaya" },
          { namaJalan: "Jalan Martanegara" },
          { namaJalan: "Jalan Turangga" },
          { namaJalan: "Jalan Gatot Subroto" },
          { namaJalan: "BSM" },
          { namaJalan: "Binong" },
          { namaJalan: "Jalan Kiara Condong" },
          { namaJalan: "Jalan Jakarta" },
          { namaJalan: "Jalan WR. Supratman" },
          { namaJalan: "Jalan Katamso" },
          { namaJalan: "Jalan Pahlawan" },
          { namaJalan: "Jalan Cikutra" },
          { namaJalan: "Jalan PHH. Mustofa (Suci)" },
          { namaJalan: "Terminal Cicaheum" },
        ])
      ),
    },
  });

  // Seed Trayek 2: CICAHEUM via BINONG – ABDUL MUIS (Kebon Kelapa)
  const trayek2 = await prisma.trayek.create({
    data: {
      namaTrayek: "CICAHEUM via BINONG – ABDUL MUIS (Kebon Kelapa)",
      lokasiAwal: "Terminal Cicaheum",
      lokasiAkhir: "Terminal Kebon Kelapa",
      rute: JSON.parse(
        JSON.stringify([
          { namaJalan: "Terminal Cicaheum" },
          { namaJalan: "Jalan PHH. Mustofa (Suci)" },
          { namaJalan: "Jalan Cikutra" },
          { namaJalan: "Jalan Katamso" },
          { namaJalan: "Jalan WR. Supratman" },
          { namaJalan: "Jalan Ahmad Yani" },
          { namaJalan: "Jalan Jakarta" },
          { namaJalan: "Jalan Kiara Condong" },
          { namaJalan: "Binong" },
          { namaJalan: "BSM" },
          { namaJalan: "Jalan Turangga" },
          { namaJalan: "Jalan Martanegara" },
          { namaJalan: "Jalan Lodaya" },
          { namaJalan: "Jalan Gajah" },
          { namaJalan: "Jalan Buah Batu" },
          { namaJalan: "Jalan Gurame" },
          { namaJalan: "Jalan Moh. Ramdan" },
          { namaJalan: "Jalan BKR" },
          { namaJalan: "Jalan Moh. Toha" },
          { namaJalan: "Jalan Dewi Sartika" },
          { namaJalan: "Terminal Kebon Kelapa" },
        ])
      ),
    },
  });

  // Seed Angkot untuk Trayek 1
  const angkot1 = await prisma.angkot.create({
    data: {
      latitude: -6.914744,
      longitude: 107.609810,
      jumlahKursi: 12,
      activeNonActive: true,
      warna: ["hijau", "kuning"],
      currentTrayekId: trayek1.id,
    },
  });

  // Seed Angkot untuk Trayek 2
  const angkot2 = await prisma.angkot.create({
    data: {
      latitude: -6.921859,
      longitude: 107.615827,
      jumlahKursi: 12,
      activeNonActive: true,
      warna: ["hijau", "kuning"],
      currentTrayekId: trayek2.id,
    },
  });

  // Seed Riwayat Perjalanan
  await prisma.riwayatPerjalanan.create({
    data: {
      userId: user.id,
      tanggal: new Date(),
      estimasiTarif: 12000,
      userTrayeks: trayek1.namaTrayek,
    },
  });

  await prisma.riwayatPerjalanan.create({
    data: {
      userId: user.id,
      tanggal: new Date(),
      estimasiTarif: 12000,
      userTrayeks: trayek2.namaTrayek,
    },
  });

  console.log("Seed data berhasil dimasukkan!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
