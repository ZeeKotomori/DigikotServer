import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  let lastNumber = 1234; // Mulai dari 1234
const prefix = "D"; // Prefix untuk nomor kendaraan
const suffix = "ABC"; // Sufix untuk nomor kendaraan

function generateNomorKendaraan() {
  lastNumber++; // Menambah angka terakhir
  const nomorKendaraan = `${prefix} ${lastNumber} ${suffix}`;
  return nomorKendaraan;
}

  // Seed User
  const user = await prisma.user.create({
    data: {
      name: "Udin",
      username: "udin",
      email: "udin@gmail.com",
      password: "udinPetot",
      role: "u",
    },
  });

  // Seed Trayek 1: Cicaheum - Kebon Kelapa
  const trayek1 = await prisma.trayek.create({
    data: {
      namaTrayek: "ABDUL MUIS (Kebon Kelapa) → CICAHEUM via BINONG",
      lokasiAwal: "Terminal Kebon Kelapa",
      lokasiAkhir: "Terminal Cicaheum",
      rute: [
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
      ],
      angkots: {
        create: [
          {
            nomorKendaraan: generateNomorKendaraan(),
            latitude: -6.914744,
            longitude: 107.60981,
            jumlahKursi: 12,
            activeNonActive: true,
            warna: ["hijau", "kuning"],
          },
        ],
      },
    },
  });

  // Seed Trayek 2: CICAHEUM via BINONG – ABDUL MUIS (Kebon Kelapa)
  const trayek2 = await prisma.trayek.create({
    data: {
      namaTrayek: "CICAHEUM via BINONG – ABDUL MUIS (Kebon Kelapa)",
      lokasiAwal: "Terminal Cicaheum",
      lokasiAkhir: "Terminal Kebon Kelapa",
      rute: [
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
      ],
      angkots: {
        create: [
          {
            nomorKendaraan: generateNomorKendaraan(),
            latitude: -6.914744,
            longitude: 107.60981,
            jumlahKursi: 12,
            activeNonActive: true,
            warna: ["hijau", "kuning"],
          },
        ],
      },
    },
  });

  // Trayek Abdul Muis → Cicaheum via Aceh (02)
const trayekAbdulMuisToCicaheum = await prisma.trayek.create({
  data: {
    namaTrayek: "ABDUL MUIS (Kebon Kelapa) → CICAHEUM via ACEH (02)",
    lokasiAwal: "Terminal Kebon Kelapa",
    lokasiAkhir: "Terminal Cicaheum",
    rute: [
      { namaJalan: "Terminal Kebon Kelapa" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Jalan Kautamaan Istri" },
      { namaJalan: "Jalan Balong Gede" },
      { namaJalan: "Jalan Pungkur" },
      { namaJalan: "Jalan Karapitan" },
      { namaJalan: "Jalan Sunda" },
      { namaJalan: "Jalan Lombok" },
      { namaJalan: "Jalan Aceh" },
      { namaJalan: "Jalan Taman Pramuka" },
      { namaJalan: "Jalan Cendana" },
      { namaJalan: "Taman WR. Supratman" },
      { namaJalan: "Jalan Katamso" },
      { namaJalan: "Jalan Pahlawan" },
      { namaJalan: "Jalan Cikutra" },
      { namaJalan: "Jalan PHH. Mustofa (Suci)" },
      { namaJalan: "Terminal Cicaheum" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9175,
          longitude: 107.6186,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "merah marun"],
        },
      ],
    },
  },
});

// Trayek Cicaheum → Abdul Muis via Aceh (02)
const trayekCicaheumToAbdulMuis = await prisma.trayek.create({
  data: {
    namaTrayek: "CICAHEUM → ABDUL MUIS (Kebon Kelapa) via ACEH (02)",
    lokasiAwal: "Terminal Cicaheum",
    lokasiAkhir: "Terminal Kebon Kelapa",
    rute: [
      { namaJalan: "Terminal Cicaheum" },
      { namaJalan: "Jalan PHH. Mustofa (Suci)" },
      { namaJalan: "Jalan Cikutra" },
      { namaJalan: "Jalan Katamso" },
      { namaJalan: "Taman WR. Supratman" },
      { namaJalan: "Jalan Cendana" },
      { namaJalan: "Jalan Taman Pramuka" },
      { namaJalan: "Jalan Aceh" },
      { namaJalan: "Jalan Lombok" },
      { namaJalan: "Jalan Belitung" },
      { namaJalan: "Jalan Sumatera" },
      { namaJalan: "Jalan Tamblong" },
      { namaJalan: "Jalan Lengkong Besar" },
      { namaJalan: "Jalan Ciateul" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Terminal Kebon Kelapa" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9225,
          longitude: 107.6391,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "merah marun"],
        },
      ],
    },
  },
});

// Trayek Abdul Muis → Dago (24 Jam)
const trayekAbdulMuisToDago = await prisma.trayek.create({
  data: {
    namaTrayek: "ABDUL MUIS (Kebon Kelapa) → DAGO",
    lokasiAwal: "Terminal Kebon Kelapa",
    lokasiAkhir: "Terminal Dago",
    rute: [
      { namaJalan: "Terminal Kebon Kelapa" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Jalan Kautamaan Istri" },
      { namaJalan: "Jalan Balong Gede" },
      { namaJalan: "Jalan Pungkur" },
      { namaJalan: "Jalan Karapitan" },
      { namaJalan: "Jalan Sunda" },
      { namaJalan: "Jalan Sumbawa" },
      { namaJalan: "Jalan Belitung" },
      { namaJalan: "Jalan Sumatera" },
      { namaJalan: "Jalan Aceh" },
      { namaJalan: "Jalan Sulawesi" },
      { namaJalan: "Jalan Seram" },
      { namaJalan: "Jalan RE Martadinata (Riau)" },
      { namaJalan: "Jalan Ir. H. Juanda (Dago)" },
      { namaJalan: "RS. Boromeus (Dago)" },
      { namaJalan: "ITB (Jalan Ganesha, Dago)" },
      { namaJalan: "Simpang Dago" },
      { namaJalan: "Terminal Dago" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8889,
          longitude: 107.6100,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "oranye"],
        },
      ],
    },
  },
});

// Trayek Dago → Abdul Muis (24 Jam)
const trayekDagoToAbdulMuis = await prisma.trayek.create({
  data: {
    namaTrayek: "DAGO → ABDUL MUIS (Kebon Kelapa)",
    lokasiAwal: "Terminal Dago",
    lokasiAkhir: "Terminal Kebon Kelapa",
    rute: [
      { namaJalan: "Terminal Dago" },
      { namaJalan: "Jalan H. Juanda (Dago)" },
      { namaJalan: "Simpang Dago" },
      { namaJalan: "ITB (Jalan Ganesha, Dago)" },
      { namaJalan: "RS. Boromeus (Dago)" },
      { namaJalan: "Jalan Sultan Agung" },
      { namaJalan: "Jalan Trunojoyo" },
      { namaJalan: "Jalan RE. Martadinata" },
      { namaJalan: "BIP (Jalan Merdeka, Dago)" },
      { namaJalan: "Jalan Aceh" },
      { namaJalan: "Jalan Kalimantan" },
      { namaJalan: "Jalan Belitung" },
      { namaJalan: "Jalan Sumatera" },
      { namaJalan: "Jalan Tamblong" },
      { namaJalan: "Jalan Lengkong Besar" },
      { namaJalan: "Jalan Ciateul" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Terminal Kebon Kelapa" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9025,
          longitude: 107.6253,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "oranye"],
        },
      ],
    },
  },
});

// Trayek Abdul Muis → Elang
const trayekAbdulMuisToElang = await prisma.trayek.create({
  data: {
    namaTrayek: "ABDUL MUIS (Kebon Kelapa) → ELANG",
    lokasiAwal: "Terminal Kebon Kelapa",
    lokasiAkhir: "Terminal Elang",
    rute: [
      { namaJalan: "Terminal Kebon Kelapa" },
      { namaJalan: "Jalan Pungkur" },
      { namaJalan: "Jalan Otto Iskandardinata (Otista)" },
      { namaJalan: "Jalan Ciateul" },
      { namaJalan: "Jalan Astana Anyar" },
      { namaJalan: "Jalan Panjunan" },
      { namaJalan: "Jalan Kopo" },
      { namaJalan: "Jalan Pasir Koja" },
      { namaJalan: "Jalan Astana Anyar" },
      { namaJalan: "Jalan Pagarsih" },
      { namaJalan: "Jalan Nawawi" },
      { namaJalan: "Jalan Aksan" },
      { namaJalan: "Jalan Suryani" },
      { namaJalan: "Jalan Holis" },
      { namaJalan: "Jalan Bojong Raya" },
      { namaJalan: "Jalan Cijerah" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Rajawali Barat" },
      { namaJalan: "Jalan Elang" },
      { namaJalan: "Terminal Elang" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9000,
          longitude: 107.6023,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "oranye"],
        },
      ],
    },
  },
});

// Trayek Elang → Abdul Muis
const trayekElangToAbdulMuis = await prisma.trayek.create({
  data: {
    namaTrayek: "ELANG → ABDUL MUIS (Kebon Kelapa)",
    lokasiAwal: "Terminal Elang",
    lokasiAkhir: "Terminal Kebon Kelapa",
    rute: [
      { namaJalan: "Terminal Elang" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Holis" },
      { namaJalan: "Jalan Nana Rohana" },
      { namaJalan: "Jalan Suryani" },
      { namaJalan: "Jalan Situ Aksan" },
      { namaJalan: "Jalan Pagarsih" },
      { namaJalan: "Jalan Kalipah Apo" },
      { namaJalan: "Jalan Otto Iskandardinata (Otista)" },
      { namaJalan: "Jalan Ciateul" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Terminal Kebon Kelapa" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9052,
          longitude: 107.6121,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "oranye"],
        },
      ],
    },
  },
});

// Trayek Abdul Muis → Ledeng
const trayekAbdulMuisToLedeng = await prisma.trayek.create({
  data: {
    namaTrayek: "ABDUL MUIS (Kebon Kelapa) → LEDENG",
    lokasiAwal: "Terminal Kebon Kelapa",
    lokasiAkhir: "Terminal Ledeng",
    rute: [
      { namaJalan: "Terminal Kebon Kelapa" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Jalan Kautamaan Istri" },
      { namaJalan: "Jalan Balong Gede" },
      { namaJalan: "Jalan Pungkur" },
      { namaJalan: "Jalan Karapitan" },
      { namaJalan: "Jalan Sunda" },
      { namaJalan: "Jalan Sumbawa" },
      { namaJalan: "Jalan Lombok" },
      { namaJalan: "Jalan Banda" },
      { namaJalan: "Jalan RE Martadinata (Riau)" },
      { namaJalan: "BIP (Dago)" },
      { namaJalan: "Jalan Merdeka" },
      { namaJalan: "Jalan Aceh" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Rivai" },
      { namaJalan: "Jalan Cipaganti" },
      { namaJalan: "Jalan Setiabudi" },
      { namaJalan: "Jalan Karang Sari" },
      { namaJalan: "Jalan Sukajadi" },
      { namaJalan: "Jalan Setiabudi" },
      { namaJalan: "Terminal Ledeng" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8605,
          longitude: 107.5956,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "biru muda"],
        },
      ],
    },
  },
});

// Trayek Ledeng → Abdul Muis
const trayekLedengToAbdulMuis = await prisma.trayek.create({
  data: {
    namaTrayek: "LEDENG → ABDUL MUIS (Kebon Kelapa)",
    lokasiAwal: "Terminal Ledeng",
    lokasiAkhir: "Terminal Kebon Kelapa",
    rute: [
      { namaJalan: "Terminal Ledeng" },
      { namaJalan: "Jalan Setiabudi" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan RE Martadinata" },
      { namaJalan: "Jalan Purnawarman" },
      { namaJalan: "BEC (Purnawarman)" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Aceh" },
      { namaJalan: "Jalan Kalimantan" },
      { namaJalan: "Jalan Belitung" },
      { namaJalan: "Jalan Sumatera" },
      { namaJalan: "Jalan Tamblong" },
      { namaJalan: "Jalan Lengkong Besar" },
      { namaJalan: "Jalan Ciateul" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Terminal Kebon Kelapa" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8795,
          longitude: 107.6087,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "biru muda"],
        },
      ],
    },
  },
});

const trayekAntapaniToCiroyom = await prisma.trayek.create({
  data: {
    namaTrayek: "ANTAPANI → CIROYOM",
    lokasiAwal: "Terminal Antapani",
    lokasiAkhir: "Terminal Ciroyom",
    rute: [
      { namaJalan: "Terminal Antapani" },
      { namaJalan: "Jalan Cibatu (Antapani)" },
      { namaJalan: "Jalan Purwakarta (Antapani)" },
      { namaJalan: "Jalan Jakarta" },
      { namaJalan: "Jalan Sukabumi" },
      { namaJalan: "Jalan Laswi" },
      { namaJalan: "Stadion Persib (Ahmad Yani)" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Jalan Gudang Utara" },
      { namaJalan: "Jalan Bangka" },
      { namaJalan: "Jalan Belitung" },
      { namaJalan: "Jalan Sumatera" },
      { namaJalan: "Jalan Aceh" },
      { namaJalan: "Jalan Merdeka" },
      { namaJalan: "Jalan Perintis Kemerdekaan – Wastu Kencana" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cicendo" },
      { namaJalan: "Jalan Kebon Kawung" },
      { namaJalan: "Stasiun Bandung (Kebon Kawung)" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Istana Plaza (Pajajaran)" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Terminal Ciroyom" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9147,
          longitude: 107.6098,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["krem", "hijau"],
        },
      ],
    },
  },
});

// Trayek CIROYOM → ANTAPANI
const trayekCiroyomToAntapani = await prisma.trayek.create({
  data: {
    namaTrayek: "CIROYOM → ANTAPANI",
    lokasiAwal: "Terminal Ciroyom",
    lokasiAkhir: "Terminal Antapani",
    rute: [
      { namaJalan: "Terminal Ciroyom" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Jalan Arjuna" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Istana Plaza (Pajajaran)" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan RE. Martadinata" },
      { namaJalan: "Jalan Purnawarman" },
      { namaJalan: "BEC (Purnawarman)" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Aceh" },
      { namaJalan: "Jalan Kalimantan" },
      { namaJalan: "Jalan Belitung" },
      { namaJalan: "Jalan Bangka" },
      { namaJalan: "Jalan Gudang Utara" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Stadion Persib (Ahmad Yani)" },
      { namaJalan: "Cicadas (Ahmad Yani)" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Jakarta (Antapani)" },
      { namaJalan: "Jalan Subang (Antapani)" },
      { namaJalan: "Jalan Cibatu (Antapani)" },
      { namaJalan: "Terminal Antapani" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9197,
          longitude: 107.6233,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["krem", "hijau"],
        },
      ],
    },
  },
});

const trayekBuahBatuToKebonKelapa = await prisma.trayek.create({
  data: {
    namaTrayek: "BUAH BATU → SEDERHANA (Buah Batu – Kebon Kelapa)",
    lokasiAwal: "Terminal Buah Batu",
    lokasiAkhir: "Terminal Kebon Kelapa",
    rute: [
      { namaJalan: "Terminal Buah Batu" },
      { namaJalan: "Jalan Buah Batu" },
      { namaJalan: "Jalan Gurame" },
      { namaJalan: "Jalan Karapitan" },
      { namaJalan: "Jalan Lengkong Kecil" },
      { namaJalan: "Jalan Lengkong Besar" },
      { namaJalan: "Jalan Ciateul" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Terminal Kebon Kelapa" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9375,
          longitude: 107.6354,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["biru tua"],
        },
      ],
    },
  },
});

// Trayek BUAH BATU → SEDERHANA (Kebon Kelapa → Sederhana)
const trayekKebonKelapaToSederhana = await prisma.trayek.create({
  data: {
    namaTrayek: "BUAH BATU → SEDERHANA (Kebon Kelapa → Sederhana)",
    lokasiAwal: "Terminal Kebon Kelapa",
    lokasiAkhir: "Terminal Sederhana",
    rute: [
      { namaJalan: "Terminal Kebon Kelapa" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Jalan Banceuy" },
      { namaJalan: "Jalan Suniaraja" },
      { namaJalan: "Jalan Otista" },
      { namaJalan: "Jalan Stasiun Timur" },
      { namaJalan: "Jalan Kebon Jukut" },
      { namaJalan: "Jalan Kebon Kawung (Stasiun Bandung)" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Rivai" },
      { namaJalan: "Jalan Rum" },
      { namaJalan: "Jalan Gunawan" },
      { namaJalan: "Jalan Otten" },
      { namaJalan: "Jalan Pasteur" },
      { namaJalan: "Jalan Pasir Kaliki (RS. Hasan Sadikin)" },
      { namaJalan: "Jalan Sederhana" },
      { namaJalan: "Terminal Sederhana" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9034,
          longitude: 107.6037,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["biru tua"],
        },
      ],
    },
  },
});

// Trayek SEDERHANA → BUAH BATU (Sederhana – Kebon Kelapa)
const trayekSederhanaToKebonKelapa = await prisma.trayek.create({
  data: {
    namaTrayek: "SEDERHANA → BUAH BATU (Sederhana – Kebon Kelapa)",
    lokasiAwal: "Terminal Sederhana",
    lokasiAkhir: "Terminal Kebon Kelapa",
    rute: [
      { namaJalan: "Terminal Sederhana" },
      { namaJalan: "Jalan Jurang" },
      { namaJalan: "Jalan Cemara" },
      { namaJalan: "Jalan Sukajadi" },
      { namaJalan: "Jalan Pasir Kaliki (RS. Hasan Sadikin)" },
      { namaJalan: "Jalan Pasteur" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cicendo" },
      { namaJalan: "Jalan Kebon Jukut" },
      { namaJalan: "Viaduct" },
      { namaJalan: "Jalan Braga" },
      { namaJalan: "Jalan Lembong" },
      { namaJalan: "Jalan Tamblong" },
      { namaJalan: "Jalan Lengkong Besar" },
      { namaJalan: "Jalan Ciateul" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Terminal Kebon Kelapa" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9052,
          longitude: 107.6104,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["biru tua"],
        },
      ],
    },
  },
});

// Trayek SEDERHANA → BUAH BATU (Kebon Kelapa → Buah Batu)
const trayekKebonKelapaToBuahBatu = await prisma.trayek.create({
  data: {
    namaTrayek: "SEDERHANA → BUAH BATU (Kebon Kelapa → Buah Batu)",
    lokasiAwal: "Terminal Kebon Kelapa",
    lokasiAkhir: "Terminal Buah Batu",
    rute: [
      { namaJalan: "Terminal Kebon Kelapa" },
      { namaJalan: "Jalan Dalem Kaum" },
      { namaJalan: "Jalan Lengkong Besar" },
      { namaJalan: "Jalan Cikawao" },
      { namaJalan: "Jalan Buah Batu" },
      { namaJalan: "Jalan Banteng" },
      { namaJalan: "Jalan Gajah" },
      { namaJalan: "Jalan Buah Batu" },
      { namaJalan: "Terminal Buah Batu" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9435,
          longitude: 107.6369,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["biru tua"],
        },
      ],
    },
  },
});

const trayekBumiAsriToCiroyom = await prisma.trayek.create({
  data: {
    namaTrayek: "BUMI ASRI → CIROYOM",
    lokasiAwal: "Bumi Asri",
    lokasiAkhir: "Terminal Ciroyom",
    rute: [
      { namaJalan: "Bumi Asri" },
      { namaJalan: "Jalan Cijerah" },
      { namaJalan: "Jalan Bojong Raya" },
      { namaJalan: "Jalan Holis" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Rajawali Barat" },
      { namaJalan: "Jalan Rajawali Timur" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Jalan Stasiun Timur" },
      { namaJalan: "Viaduct" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Rivai" },
      { namaJalan: "Jalan Cipto" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Istana Plaza (Pasir Kaliki)" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Arjuna" },
      { namaJalan: "Jalan Supadio" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Terminal Ciroyom" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9301,
          longitude: 107.6004,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["kuning-hijau"],
        },
      ],
    },
  },
});

// Trayek CIROYOM → BUMI ASRI
const trayekCiroyomToBumiAsri = await prisma.trayek.create({
  data: {
    namaTrayek: "CIROYOM → BUMI ASRI",
    lokasiAwal: "Terminal Ciroyom",
    lokasiAkhir: "Bumi Asri",
    rute: [
      { namaJalan: "Terminal Ciroyom" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Holis" },
      { namaJalan: "Jalan Bojong Raya" },
      { namaJalan: "Jalan Cijerah" },
      { namaJalan: "Bumi Asri" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9432,
          longitude: 107.5896,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["kuning-hijau"],
        },
      ],
    },
  },
});

const trayekCaringinToDago = await prisma.trayek.create({
  data: {
    namaTrayek: "CARINGIN → DAGO",
    lokasiAwal: "Pasar Induk Caringin",
    lokasiAkhir: "Terminal Dago",
    rute: [
      { namaJalan: "Pasar Induk Caringin" },
      { namaJalan: "Jalan Babakan Ciparay" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Sukamulya" },
      { namaJalan: "Jalan Terusan Jamika" },
      { namaJalan: "Jalan Jamika" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Guanan" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan RE. Martadinata" },
      { namaJalan: "Jalan Purnawarman" },
      { namaJalan: "UNISBA & UNPAS (Tamansari)" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Cikapayang" },
      { namaJalan: "Jalan Surapati (Suci)" },
      { namaJalan: "Jalan Pahlawan" },
      { namaJalan: "Jalan Cikutra Barat" },
      { namaJalan: "Jalan Cigadung Raya" },
      { namaJalan: "Terminal Dago" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8723,
          longitude: 107.6224,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["oranye", "hijau"],
        },
      ],
    },
  },
});

// Trayek DAGO → CARINGIN
const trayekDagoToCaringin = await prisma.trayek.create({
  data: {
    namaTrayek: "DAGO → CARINGIN",
    lokasiAwal: "Terminal Dago",
    lokasiAkhir: "Pasar Induk Caringin",
    rute: [
      { namaJalan: "Terminal Dago" },
      { namaJalan: "Jalan Cigadung Raya" },
      { namaJalan: "Jalan Cikutra Barat" },
      { namaJalan: "Jalan Pahlawan" },
      { namaJalan: "Jalan Surapati (Suci)" },
      { namaJalan: "Jalan Cikapayang" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Sawunggaling" },
      { namaJalan: "Jalan Rangga Gading" },
      { namaJalan: "UNISBA & UNPAS (Tamansari)" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Purnawarman" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cicendo" },
      { namaJalan: "Jalan Rivai" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Arjuna" },
      { namaJalan: "Jalan Supadio" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Jalan Rajawali Timur" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Jalan Waringin" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Jamika" },
      { namaJalan: "Jalan Terusan Jamika" },
      { namaJalan: "Jalan Sukamulya" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Babakan Ciparay" },
      { namaJalan: "Pasar Induk Caringin (Sukarno-Hatta)" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9105,
          longitude: 107.5872,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["oranye", "hijau"],
        },
      ],
    },
  },
});

const trayekCaringinToSadangSerang = await prisma.trayek.create({
  data: {
    namaTrayek: "CARINGIN → SADANG SERANG",
    lokasiAwal: "Terminal Caringin",
    lokasiAkhir: "Terminal Sadang Serang",
    rute: [
      { namaJalan: "Terminal Caringin" },
      { namaJalan: "Jalan Caringin" },
      { namaJalan: "Jalan Holis" },
      { namaJalan: "Jalan Bojong Raya" },
      { namaJalan: "Jalan Cijerah" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Rajawali Barat" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jl Abdul Rahman Saleh" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Pandu" },
      { namaJalan: "Jalan Rajiman" },
      { namaJalan: "Jalan Rivai" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Ganesha" },
      { namaJalan: "Jalan Ir. H. Juanda (Dago)" },
      { namaJalan: "Jalan TB. Ismail" },
      { namaJalan: "Jalan Sadang Serang" },
      { namaJalan: "Terminal Sadang Serang" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8723,
          longitude: 107.6224,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["biru muda", "hijau"],
        },
      ],
    },
  },
});

const trayekSadangSerangToCaringin = await prisma.trayek.create({
  data: {
    namaTrayek: "SADANG SERANG → CARINGIN",
    lokasiAwal: "Terminal Sadang Serang",
    lokasiAkhir: "Terminal Caringin",
    rute: [
      { namaJalan: "Terminal Sadang Serang" },
      { namaJalan: "Jalan Serang Serang" },
      { namaJalan: "Jalan Tubagus Ismail" },
      { namaJalan: "Simpang Dago" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Sawunggaling" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan RE. Martadinata" },
      { namaJalan: "Jalan Purnawarman" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cicendo" },
      { namaJalan: "Jalan Kebon Kawung" },
      { namaJalan: "Stasiun Bandung (Kebon Kawung)" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Kresna" },
      { namaJalan: "Jalan Bima" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Cijerah" },
      { namaJalan: "Jalan Bojong Raya" },
      { namaJalan: "Jalan Holis" },
      { namaJalan: "Jalan Caringin" },
      { namaJalan: "Terminal Caringin" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9476,
          longitude: 107.6154,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["biru muda", "hijau"],
        },
      ],
    },
  },
});

const trayekCibaduyutToCicaheum = await prisma.trayek.create({
  data: {
    namaTrayek: "CIBADUYUT → CICAHEUM",
    lokasiAwal: "Terminal Cibaduyut",
    lokasiAkhir: "Terminal Cicaheum",
    rute: [
      { namaJalan: "Terminal Cibaduyut" },
      { namaJalan: "Jalan Cibaduyut" },
      { namaJalan: "Jalan Kopo" },
      { namaJalan: "Terminal Leuwi Panjang (Sukarno-Hatta)" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Jakarta" },
      { namaJalan: "Jalan WR. Supratman" },
      { namaJalan: "Jalan Katamso" },
      { namaJalan: "Jalan Pahlawan" },
      { namaJalan: "Jalan Cikutra" },
      { namaJalan: "Jalan PHH. Mutofa (Suci)" },
      { namaJalan: "Terminal Cicaheum" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9453,
          longitude: 107.5962,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["merah", "strip putih"],
        },
      ],
    },
  },
});

const trayekCicaheumToCibaduyut = await prisma.trayek.create({
  data: {
    namaTrayek: "CICAHEUM → CIBADUYUT",
    lokasiAwal: "Terminal Cicaheum",
    lokasiAkhir: "Terminal Cibaduyut",
    rute: [
      { namaJalan: "Terminal Cicaheum" },
      { namaJalan: "Jalan PHH. Mustofa (Suci)" },
      { namaJalan: "Jalan Katamso" },
      { namaJalan: "Jalan WR. Supratman" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Jalan Jakarta" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Terminal Leuwi Panjang (Sukarno-Hatta)" },
      { namaJalan: "Jalan Kopo" },
      { namaJalan: "Jalan Cibaduyut" },
      { namaJalan: "Terminal Cibaduyut" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9502,
          longitude: 107.6158,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["merah", "strip putih"],
        },
      ],
    },
  },
});

const trayekCibaduyutToKarangSetraKebonKalapa = await prisma.trayek.create({
  data: {
    namaTrayek: "CIBADUYUT → KARANG SETRA (Cibaduyut → Kebon Kalapa)",
    lokasiAwal: "Jalan Cibaduyut",
    lokasiAkhir: "Terminal Kebon Kalapa",
    rute: [
      { namaJalan: "Jalan Cibaduyut" },
      { namaJalan: "Jalan Bojongloa" },
      { namaJalan: "Jalan Peta" },
      { namaJalan: "Jalan BKR" },
      { namaJalan: "Jalan Moh. Toha" },
      { namaJalan: "Jalan Pungkur" },
      { namaJalan: "Terminal Kebon Kalapa" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9401,
          longitude: 107.6174,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["kuning"],
        },
      ],
    },
  },
});

const trayekCibaduyutToKarangSetraKarangSetra = await prisma.trayek.create({
  data: {
    namaTrayek: "CIBADUYUT → KARANG SETRA (Kebon Kalapa → Karang Setra)",
    lokasiAwal: "Terminal Kebon Kalapa",
    lokasiAkhir: "Karang Setra",
    rute: [
      { namaJalan: "Terminal Kebon Kalapa" },
      { namaJalan: "Jalan Pasir Koja" },
      { namaJalan: "Jalan Pajagalan" },
      { namaJalan: "Jalan Gardu Jati" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Sukajadi" },
      { namaJalan: "Karang Setra" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9279,
          longitude: 107.6073,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["kuning"],
        },
      ],
    },
  },
});

const trayekKarangSetraToCibaduyutKarangSetra = await prisma.trayek.create({
  data: {
    namaTrayek: "KARANG SETRA → CIBADUYUT (Karang Setra → Kebon Kalapa)",
    lokasiAwal: "Karang Setra",
    lokasiAkhir: "Terminal Kebon Kalapa",
    rute: [
      { namaJalan: "Karang Setra" },
      { namaJalan: "Jalan Sukajadi" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cicendo" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Jalan Dulatip" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Astana Anyar" },
      { namaJalan: "Jalan Pasir Koja" },
      { namaJalan: "Terminal Kebon Kalapa" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9065,
          longitude: 107.6169,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["kuning"],
        },
      ],
    },
  },
});

const trayekKarangSetraToCibaduyutCibaduyut = await prisma.trayek.create({
  data: {
    namaTrayek: "KARANG SETRA → CIBADUYUT (Kebon Kalapa → Cibaduyut)",
    lokasiAwal: "Terminal Kebon Kalapa",
    lokasiAkhir: "Jalan Cibaduyut",
    rute: [
      { namaJalan: "Terminal Kebon Kalapa" },
      { namaJalan: "Jalan Otto Iskandardinata" },
      { namaJalan: "Jalan Peta" },
      { namaJalan: "Jalan Bojongloa" },
      { namaJalan: "Jalan Cibaduyut" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9232,
          longitude: 107.6172,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["kuning"],
        },
      ],
    },
  },
});

// Rute CIBIRU → CICADAS
const trayekCibiruToCicadas = await prisma.trayek.create({
  data: {
    namaTrayek: "CIBIRU → CICADAS",
    lokasiAwal: "Terminal Cibiru",
    lokasiAkhir: "Cicadas (Ahmad Yani)",
    rute: [
      { namaJalan: "Terminal Cibiru" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Pasar Induk Gede Bage (Sukarno-Hatta)" },
      { namaJalan: "Riung Bandung (Sukarno-Hatta)" },
      { namaJalan: "Metro (Sukarno-Hatta)" },
      { namaJalan: "Margahayu Raya (Sukarno-Hatta)" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Jakarta" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Cicadas (Ahmad Yani)" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9447,
          longitude: 107.6511,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "biru"],
        },
      ],
    },
  },
});

// Rute CICADAS → CIBIRU
const trayekCicadasToCibiru = await prisma.trayek.create({
  data: {
    namaTrayek: "CICADAS → CIBIRU",
    lokasiAwal: "Cicadas (Ahmad Yani)",
    lokasiAkhir: "Terminal Cibiru",
    rute: [
      { namaJalan: "Cicadas (Ahmad Yani)" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Margahayu Raya (Sukarno-Hatta)" },
      { namaJalan: "Metro (Sukarno-Hatta)" },
      { namaJalan: "Riung Bandung (Sukarno-Hatta)" },
      { namaJalan: "Pasar Induk Gede Bage (Sukarno-Hatta)" },
      { namaJalan: "Terminal Cibiru" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9375,
          longitude: 107.6274,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "biru"],
        },
      ],
    },
  },
});

// Rute CIBOGO → ELANG
const trayekCibogoToElang = await prisma.trayek.create({
  data: {
    namaTrayek: "CIBOGO → ELANG",
    lokasiAwal: "Cibogo",
    lokasiAkhir: "Elang",
    rute: [
      { namaJalan: "Cibogo" },
      { namaJalan: "Jalan Hercules" },
      { namaJalan: "Jalan Pinggir Tol" },
      { namaJalan: "Jalan Sukawarna" },
      { namaJalan: "Jalan Suparmin" },
      { namaJalan: "Jalan Sebelah IPTN" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Elang" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8982,
          longitude: 107.6220,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "biru"],
        },
      ],
    },
  },
});

// Rute ELANG → CIBOGO
const trayekElangToCibogo = await prisma.trayek.create({
  data: {
    namaTrayek: "ELANG → CIBOGO",
    lokasiAwal: "Elang",
    lokasiAkhir: "Cibogo",
    rute: [
      { namaJalan: "Elang" },
      { namaJalan: "Jalan Rajawali Timur" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Sebelah IPTN" },
      { namaJalan: "Jalan Suparmin" },
      { namaJalan: "Jalan Sukawarna" },
      { namaJalan: "Jalan DR. Junjunan (Terusan Pasteur)" },
      { namaJalan: "Jalan Pinggir Tol" },
      { namaJalan: "Jalan Hercules" },
      { namaJalan: "Cibogo" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8946,
          longitude: 107.6167,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "biru"],
        },
      ],
    },
  },
});

// Rute CIBURIAL → CIROYOM
const trayekCiburialToCiroyom = await prisma.trayek.create({
  data: {
    namaTrayek: "CIBURIAL → CIROYOM",
    lokasiAwal: "Ciburial (Dago Atas)",
    lokasiAkhir: "Terminal Ciroyom",
    rute: [
      { namaJalan: "Ciburial (Dago Atas)" },
      { namaJalan: "Terminal Dago" },
      { namaJalan: "Jalan H. Juanda (Dago)" },
      { namaJalan: "Simpang Dago" },
      { namaJalan: "ITB (Jalan Ganesha, Dago)" },
      { namaJalan: "RS. Boromeus (Dago)" },
      { namaJalan: "Jalan Sulanjana" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Sawunggaling" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cicendo" },
      { namaJalan: "Jalan Kebon Kawung" },
      { namaJalan: "Stasiun Bandung (Kebon Kawung)" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Terminal Ciroyom" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9005,
          longitude: 107.6263,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "krem"],
        },
      ],
    },
  },
});

// Rute CIROYOM → CIBURIAL
const trayekCiroyomToCiburial = await prisma.trayek.create({
  data: {
    namaTrayek: "CIROYOM → CIBURIAL",
    lokasiAwal: "Terminal Ciroyom",
    lokasiAkhir: "Ciburial (Dago Atas)",
    rute: [
      { namaJalan: "Terminal Ciroyom" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Jalan Arjuna" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Sulanjana" },
      { namaJalan: "Jalan H. Juanda (Dago)" },
      { namaJalan: "RS. Boromeus (Dago)" },
      { namaJalan: "ITB (Jalan Ganesha)" },
      { namaJalan: "Simpang Dago" },
      { namaJalan: "Terminal Dago" },
      { namaJalan: "Ciburial (Dago Atas)" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8912,
          longitude: 107.6190,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "krem"],
        },
      ],
    },
  },
});

// Rute CICADAS → ELANG
const trayekCicadasToElang = await prisma.trayek.create({
  data: {
    namaTrayek: "CICADAS → ELANG",
    lokasiAwal: "Cicadas",
    lokasiAkhir: "Elang",
    rute: [
      { namaJalan: "Cicadas" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Gatot Subroto" },
      { namaJalan: "Jalan Burangrang" },
      { namaJalan: "Jalan Sadakeling" },
      { namaJalan: "Jalan Buah Batu" },
      { namaJalan: "Jalan Gurame" },
      { namaJalan: "Jalan Karapitan" },
      { namaJalan: "Jalan Lengkong Kecil" },
      { namaJalan: "Jalan Lengkong Besar" },
      { namaJalan: "Jalan Pungkur" },
      { namaJalan: "Terminal Kebon Kelapa" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Alun-Alun" },
      { namaJalan: "Jalan Banceuy" },
      { namaJalan: "Jalan Suniaraja" },
      { namaJalan: "Jalan Otista" },
      { namaJalan: "Jalan Stasiun Timur" },
      { namaJalan: "Viaduct" },
      { namaJalan: "Jalan Kebon Jukut" },
      { namaJalan: "Jalan Kebon Kawung" },
      { namaJalan: "Stasiun Bandung (Kebon Kawung)" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Dadali" },
      { namaJalan: "Jalan Kasuari" },
      { namaJalan: "Jalan Rajawali Barat" },
      { namaJalan: "Elang" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9012,
          longitude: 107.6157,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["merah", "hijau"],
        },
      ],
    },
  },
});

// Rute ELANG → CICADAS
const trayekElangToCicadas = await prisma.trayek.create({
  data: {
    namaTrayek: "ELANG → CICADAS",
    lokasiAwal: "Elang",
    lokasiAkhir: "Cicadas",
    rute: [
      { namaJalan: "Elang" },
      { namaJalan: "Jalan Rajawali Timur" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Jalan Otto Iskandardinata (Otista)" },
      { namaJalan: "Jalan Ciateul" },
      { namaJalan: "Jalan Moh. Toha" },
      { namaJalan: "Jalan Pungkur" },
      { namaJalan: "Terminal Kebon Kelapa" },
      { namaJalan: "Jalan Dewi Sartika" },
      { namaJalan: "Jalan Dalem Kaum" },
      { namaJalan: "Jalan Lengkong Besar" },
      { namaJalan: "Jalan Cikawao" },
      { namaJalan: "Jalan Sadakeling" },
      { namaJalan: "Jalan Burangrang" },
      { namaJalan: "Jalan Gatot Subroto" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Jakarta" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Cicadas" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8953,
          longitude: 107.6089,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["merah", "hijau"],
        },
      ],
    },
  },
});

// Rute CICAHEUM → CIROYOM
const trayekCicaheumToCiroyom = await prisma.trayek.create({
  data: {
    namaTrayek: "CICAHEUM → CIROYOM",
    lokasiAwal: "Cicaheum",
    lokasiAkhir: "Ciroyom",
    rute: [
      { namaJalan: "Terminal Cicaheum" },
      { namaJalan: "Jalan PHH. Mustofa (Suci)" },
      { namaJalan: "Jalan Surapati (Suci)" },
      { namaJalan: "Lapangan Gasibu (Surapati)" },
      { namaJalan: "Jalan Panatayuda" },
      { namaJalan: "Jalan Dipati Ukur" },
      { namaJalan: "Simpang Dago" },
      { namaJalan: "Jalan Sumur Bandung" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Siliwangi" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Eyckman" },
      { namaJalan: "RS. Hasan Sadikin" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Terminal Ciroyom" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9123,
          longitude: 107.6023,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "oranye"],
        },
      ],
    },
  },
});

// Rute CIROYOM → CICAHEUM
const trayekCiroyomToCicaheum = await prisma.trayek.create({
  data: {
    namaTrayek: "CIROYOM → CICAHEUM",
    lokasiAwal: "Ciroyom",
    lokasiAkhir: "Cicaheum",
    rute: [
      { namaJalan: "Terminal Ciroyom" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Jalan Arjuna" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "RS Hasan Sadikin" },
      { namaJalan: "Jalan Eyckman" },
      { namaJalan: "Jalan Cipaganti" },
      { namaJalan: "Jalan Setiabudi" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Siliwangi" },
      { namaJalan: "Simpang Dago" },
      { namaJalan: "Jalan Dipati Ukur" },
      { namaJalan: "Jalan Singa Perbangsa" },
      { namaJalan: "Monumen Perjuangan" },
      { namaJalan: "Jalan Japati" },
      { namaJalan: "Lapangan Gasibu (Surapati)" },
      { namaJalan: "Jalan Surapati (Suci)" },
      { namaJalan: "Jalan PHH. Mustofa (Suci)" },
      { namaJalan: "Terminal Cicaheum" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8987,
          longitude: 107.6125,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "oranye"],
        },
      ],
    },
  },
});

// Rute CICAHEUM → CIWASTRA
const trayekCicaheumToCiwastra = await prisma.trayek.create({
  data: {
    namaTrayek: "CICAHEUM → CIWASTRA",
    lokasiAwal: "Cicaheum",
    lokasiAkhir: "Ciwastra",
    rute: [
      { namaJalan: "Terminal Cicaheum" },
      { namaJalan: "Jalan PHH. Mustofa (Suci)" },
      { namaJalan: "Jalan Surapati (Suci)" },
      { namaJalan: "Jalan Sentot Alibasyah" },
      { namaJalan: "Jalan Diponegoro" },
      { namaJalan: "Jalan WR. Supratman" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Jalan Jakarta" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Terusan Kiara Condong" },
      { namaJalan: "Jalan Margacinta" },
      { namaJalan: "Jalan Ciwastra" },
      { namaJalan: "Terminal Ciwastra" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9390,
          longitude: 107.6094,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["coklat", "putih"],
        },
      ],
    },
  },
});

// Rute CIWASTRA → CICAHEUM
const trayekCiwastraToCicaheum = await prisma.trayek.create({
  data: {
    namaTrayek: "CIWASTRA → CICAHEUM",
    lokasiAwal: "Ciwastra",
    lokasiAkhir: "Cicaheum",
    rute: [
      { namaJalan: "Terminal Ciwastra" },
      { namaJalan: "Jalan Ciwastra" },
      { namaJalan: "Jalan Margacinta" },
      { namaJalan: "Jalan Terusan Kiara Condong" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Jakarta" },
      { namaJalan: "Jalan WR. Supratman" },
      { namaJalan: "Jalan Diponegoro" },
      { namaJalan: "Jalan Sentot Alibasyah" },
      { namaJalan: "Lapangan Gasibu" },
      { namaJalan: "Jalan Surapati (Suci)" },
      { namaJalan: "Jalan PHH. Mustofa (Suci)" },
      { namaJalan: "Terminal Cicaheum" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9278,
          longitude: 107.6302,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["coklat", "putih"],
        },
      ],
    },
  },
});

// Rute CICAHEUM → CILEUNYI
const trayekCicaheumToCileunyi = await prisma.trayek.create({
  data: {
    namaTrayek: "CICAHEUM → CILEUNYI",
    lokasiAwal: "Cicaheum",
    lokasiAkhir: "Cileunyi",
    rute: [
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Jalan Suniaraja" },
      { namaJalan: "Jalan Otto Iskandardinata (Otista)" },
      { namaJalan: "Jalan ABC" },
      { namaJalan: "Jalan Naripan" },
      { namaJalan: "Jalan Sunda" },
      { namaJalan: "Jalan Veteran" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Pasar Kosambi (Ahmad Yani)" },
      { namaJalan: "Cicadas (Ahmad Yani)" },
      { namaJalan: "Terminal Cicaheum" },
      { namaJalan: "Jalan AH. Nasution" },
      { namaJalan: "Sindanglaya (Nasution)" },
      { namaJalan: "Ujung Berung (Nasution)" },
      { namaJalan: "Cilengkrang (Nasution)" },
      { namaJalan: "Jalan Cibiru" },
      { namaJalan: "Batas Kotamadya Bandung" },
      { namaJalan: "Jalan Cinunuk" },
      { namaJalan: "Jalan Cileunyi" },
      { namaJalan: "Terminal Cileunyi" },
      { namaJalan: "Pintu Tol Cileunyi" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9457,
          longitude: 107.6173,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "putih"],
        },
      ],
    },
  },
});

// Rute CILEUNYI → CICAHEUM
const trayekCileunyiToCicaheum = await prisma.trayek.create({
  data: {
    namaTrayek: "CILEUNYI → CICAHEUM",
    lokasiAwal: "Cileunyi",
    lokasiAkhir: "Cicaheum",
    rute: [
      { namaJalan: "Terminal Cileunyi" },
      { namaJalan: "Jalan Cileunyi" },
      { namaJalan: "Jalan Cinunuk" },
      { namaJalan: "Batas Kotamadya Bandung" },
      { namaJalan: "Jalan Cibiru" },
      { namaJalan: "Jalan AH. Nasution" },
      { namaJalan: "Cilengkrang (Nasution)" },
      { namaJalan: "Ujung Berung (Nasution)" },
      { namaJalan: "Sindanglaya (Nasution)" },
      { namaJalan: "Terminal Cicaheum" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Cicadas (Ahmad Yani)" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Jakarta" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Pasar Kosambi (Ahmad Yani)" },
      { namaJalan: "Jalan Asia-Afrika" },
      { namaJalan: "Jalan Sudirman" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9602,
          longitude: 107.6378,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "putih"],
        },
      ],
    },
  },
});

// Rute CICAHEUM → LEDENG
const trayekCicaheumToLedeng = await prisma.trayek.create({
  data: {
    namaTrayek: "CICAHEUM → LEDENG",
    lokasiAwal: "Cicaheum",
    lokasiAkhir: "Ledeng",
    rute: [
      { namaJalan: "Terminal Cicaheum" },
      { namaJalan: "Jalan PHH. Mustofa (Suci)" },
      { namaJalan: "Jalan Katamso" },
      { namaJalan: "Jalan WR. Supratman" },
      { namaJalan: "Jalan Diponegoro" },
      { namaJalan: "Jalan Sulanjana" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Siliwangi" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Lamping" },
      { namaJalan: "Jalan Cipaganti" },
      { namaJalan: "Jalan Setiabudi" },
      { namaJalan: "Jalan Karang Sari" },
      { namaJalan: "Jalan Sukajadi" },
      { namaJalan: "Jalan Setiabudi" },
      { namaJalan: "Terminal Ledeng" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8801,
          longitude: 107.5949,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "hitam"],
        },
      ],
    },
  },
});

// Rute LEDENG → CICAHEUM
const trayekLedengToCicaheum = await prisma.trayek.create({
  data: {
    namaTrayek: "LEDENG → CICAHEUM",
    lokasiAwal: "Ledeng",
    lokasiAkhir: "Cicaheum",
    rute: [
      { namaJalan: "Terminal Ledeng" },
      { namaJalan: "Jalan Setiabudi" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Siliwangi" },
      { namaJalan: "Jalan Sumur Bandung" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Sulanjana" },
      { namaJalan: "Jalan Diponegoro" },
      { namaJalan: "Jalan WR. Supratman" },
      { namaJalan: "Jalan Katamso" },
      { namaJalan: "Jalan Pahlawan" },
      { namaJalan: "Jalan Cikutra" },
      { namaJalan: "Jalan PHH. Mustofa (Suci)" },
      { namaJalan: "Terminal Cicaheum" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.8917,
          longitude: 107.6042,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "hitam"],
        },
      ],
    },
  },
});

// Rute CIJERAH → CIWASTRA
const trayekCijerahToCiwastra = await prisma.trayek.create({
  data: {
    namaTrayek: "CIJERAH → CIWASTRA",
    lokasiAwal: "Cijerah",
    lokasiAkhir: "Ciwastra",
    rute: [
      { namaJalan: "Jalan Cijerah" },
      { namaJalan: "Jalan Bojong Raya" },
      { namaJalan: "Jalan Holis" },
      { namaJalan: "Jalan Caringin" },
      { namaJalan: "Jalan Kopo" },
      { namaJalan: "Jalan Peta" },
      { namaJalan: "Jalan BKR" },
      { namaJalan: "Jalan Moh. Ramdan" },
      { namaJalan: "Jalan Sadakeling" },
      { namaJalan: "Jalan Talaga Bodas" },
      { namaJalan: "Jalan Pelajar Pejuang" },
      { namaJalan: "Jalan Martanegara" },
      { namaJalan: "Jalan Reog" },
      { namaJalan: "Jalan Karawitan" },
      { namaJalan: "Jalan Kliningan" },
      { namaJalan: "Jalan Buah Batu" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Terusan Kiara Condong" },
      { namaJalan: "Jalan Margacinta" },
      { namaJalan: "Jalan Ciwastra" },
      { namaJalan: "Terminal Ciwastra" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9302,
          longitude: 107.6414,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["abu-abu"],
        },
      ],
    },
  },
});

// Rute CIWASTRA → CIJERAH
const trayekCiwastraToCijerah = await prisma.trayek.create({
  data: {
    namaTrayek: "CIWASTRA → CIJERAH",
    lokasiAwal: "Ciwastra",
    lokasiAkhir: "Cijerah",
    rute: [
      { namaJalan: "Terminal Ciwastra" },
      { namaJalan: "Jalan Ciwastra" },
      { namaJalan: "Jalan Margacinta" },
      { namaJalan: "Jalan Terusan Kiara Condong" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Buah Batu" },
      { namaJalan: "Jalan Kliningan" },
      { namaJalan: "Jalan Karawitan" },
      { namaJalan: "Jalan Reog" },
      { namaJalan: "Jalan Martanegara" },
      { namaJalan: "Jalan Lodaya" },
      { namaJalan: "Jalan Sadakeling" },
      { namaJalan: "Jalan Buah Batu" },
      { namaJalan: "Jalan Moh. Ramdan" },
      { namaJalan: "Jalan BKR" },
      { namaJalan: "Jalan Peta" },
      { namaJalan: "Jalan Bojongloa" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Caringin" },
      { namaJalan: "Jalan Holis" },
      { namaJalan: "Jalan Bojong Raya" },
      { namaJalan: "Jalan Cijerah" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9117,
          longitude: 107.6402,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["abu-abu"],
        },
      ],
    },
  },
});

// Rute CIJERAH → SEDERHANA
const trayekCijerahToSederhana = await prisma.trayek.create({
  data: {
    namaTrayek: "CIJERAH → SEDERHANA",
    lokasiAwal: "Cijerah",
    lokasiAkhir: "Sederhana",
    rute: [
      { namaJalan: "Jalan Melong Asih" },
      { namaJalan: "Jalan Cijerah" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Rajawali Barat" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Pandu" },
      { namaJalan: "Jalan Dursasana" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Sederhana" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9193,
          longitude: 107.6321,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["abu-abu"],
        },
      ],
    },
  },
});

// Rute SEDERHANA → CIJERAH
const trayekSederhanaToCijerah = await prisma.trayek.create({
  data: {
    namaTrayek: "SEDERHANA → CIJERAH",
    lokasiAwal: "Sederhana",
    lokasiAkhir: "Cijerah",
    rute: [
      { namaJalan: "Jalan Sederhana" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Istana Plaza (Pasir Kaliki)" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Garuda" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Cijerah" },
      { namaJalan: "Jalan Melong Asih" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9092,
          longitude: 107.6197,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["abu-abu"],
        },
      ],
    },
  },
});

// Rute CIKUDAPATEUH → CIROYOM
const trayekCikudapateuhToCiroyom = await prisma.trayek.create({
  data: {
    namaTrayek: "CIKUDAPATEUH → CIROYOM",
    lokasiAwal: "Cikudapateuh",
    lokasiAkhir: "Ciroyom",
    rute: [
      { namaJalan: "Jalan Cikudapateuh" },
      { namaJalan: "Jalan Kembang Sepatu" },
      { namaJalan: "Jalan Tarate" },
      { namaJalan: "Jalan Samboja" },
      { namaJalan: "Jalan Laswi" },
      { namaJalan: "Jalan Gatot Subroto" },
      { namaJalan: "Jalan Malabar" },
      { namaJalan: "Jalan Buah Batu" },
      { namaJalan: "Jalan Gurame" },
      { namaJalan: "Jalan Moh. Ramdan" },
      { namaJalan: "Jalan BKR" },
      { namaJalan: "Jalan Peta" },
      { namaJalan: "Jalan Kopo" },
      { namaJalan: "Jalan Pasir Koja" },
      { namaJalan: "Jalan Astana Anyar" },
      { namaJalan: "Jalan Cibadak" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Guanan" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Jalan Arjuna" },
      { namaJalan: "Terminal Ciroyom" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9244,
          longitude: 107.6049,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "strip oranye"],
        },
      ],
    },
  },
});

// Rute CIROYOM → CIKUDAPATEUH
const trayekCiroyomToCikudapateuh = await prisma.trayek.create({
  data: {
    namaTrayek: "CIROYOM → CIKUDAPATEUH",
    lokasiAwal: "Ciroyom",
    lokasiAkhir: "Cikudapateuh",
    rute: [
      { namaJalan: "Terminal Ciroyom" },
      { namaJalan: "Jalan Arjuna" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Jalan Gardu Jati" },
      { namaJalan: "Jalan Astana Anyar" },
      { namaJalan: "Jalan Kopo" },
      { namaJalan: "Jalan Peta" },
      { namaJalan: "Jalan BKR" },
      { namaJalan: "Jalan Moh. Ramdan" },
      { namaJalan: "Jalan Banteng" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Jalan Cikudapateuh" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9332,
          longitude: 107.6091,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "strip oranye"],
        },
      ],
    },
  },
});

// Rute CIMAHI → ST HALL
const trayekCimahiToStHall = await prisma.trayek.create({
  data: {
    namaTrayek: "CIMAHI → ST HALL",
    lokasiAwal: "Cimahi",
    lokasiAkhir: "St Hall",
    rute: [
      { namaJalan: "Jalan Cimahi" },
      { namaJalan: "Jalan Gunung Batu" },
      { namaJalan: "Jalan DR. Junjunan (Terusan Pasteur)" },
      { namaJalan: "Jalan Cipedes Kidul" },
      { namaJalan: "Jalan Sukajadi" },
      { namaJalan: "Jalan Cemara" },
      { namaJalan: "Jalan Jurang" },
      { namaJalan: "Sederhana" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9245,
          longitude: 107.6091,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "strip oranye"],
        },
      ],
    },
  },
});

// Rute CIMINDI → SEDERHANA
const trayekCimindiToSederhana = await prisma.trayek.create({
  data: {
    namaTrayek: "CIMINDI → SEDERHANA",
    lokasiAwal: "Cimindi",
    lokasiAkhir: "Sederhana",
    rute: [
      { namaJalan: "Cimindi" },
      { namaJalan: "Jalan Gunung Batu" },
      { namaJalan: "Jalan DR. Junjunan (Terusan Pasteur)" },
      { namaJalan: "Jalan Cipedes Kidul" },
      { namaJalan: "Jalan Sukajadi" },
      { namaJalan: "Jalan Cemara" },
      { namaJalan: "Jalan Jurang" },
      { namaJalan: "Sederhana" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9175,
          longitude: 107.6095,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "strip oranye"],
        },
      ],
    },
  },
});

// Rute CIROYOM → SARIJADI
const trayekCiroyomToSarijadi = await prisma.trayek.create({
  data: {
    namaTrayek: "CIROYOM → SARIJADI",
    lokasiAwal: "Ciroyom",
    lokasiAkhir: "Sarijadi",
    rute: [
      { namaJalan: "Terminal Ciroyom" },
      { namaJalan: "Jalan Arjuna" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Baladewa" },
      { namaJalan: "Jalan Dursasana" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Sukajadi" },
      { namaJalan: "Jalan Sindang Sirna" },
      { namaJalan: "Jalan Geger Kalong Hilir" },
      { namaJalan: "Jalan Sari Endah" },
      { namaJalan: "Jalan Sari Jadi" },
      { namaJalan: "Jalan Sari Manah (Sarijadi)" },
      { namaJalan: "Jalan Sari Wangi (Sarijadi)" },
      { namaJalan: "Terminal Sarijadi" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9175,
          longitude: 107.6205,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "strip oranye"],
        },
      ],
    },
  },
});

// Rute SARIJADI → CIROYOM
const trayekSarijadiToCiroyom = await prisma.trayek.create({
  data: {
    namaTrayek: "SARIJADI → CIROYOM",
    lokasiAwal: "Sarijadi",
    lokasiAkhir: "Ciroyom",
    rute: [
      { namaJalan: "Terminal Sarijadi" },
      { namaJalan: "Jalan Sari Wangi (Sarijadi)" },
      { namaJalan: "Jalan Sari Manah (Sarijadi)" },
      { namaJalan: "Jalan Sari Asih (Sarijadi)" },
      { namaJalan: "Jalan Sari Jadi" },
      { namaJalan: "Jalan Geger Kalong Hilir" },
      { namaJalan: "Jalan Cipedes" },
      { namaJalan: "Jalan Sindang Sirna" },
      { namaJalan: "Jalan Sirnagalih" },
      { namaJalan: "Jalan Sukajadi" },
      { namaJalan: "Jalan Sukamaju" },
      { namaJalan: "Jalan Sederhana" },
      { namaJalan: "RS. Hasan Sadikin" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Abdul Rahman Saleh" },
      { namaJalan: "Jalan Ciroyom" },
      { namaJalan: "Terminal Ciroyom" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9178,
          longitude: 107.6135,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["hijau", "strip oranye"],
        },
      ],
    },
  },
});

// Rute CISITU → TEGALEGA
const trayekCisituToTegalega = await prisma.trayek.create({
  data: {
    namaTrayek: "CISITU → TEGALEGA",
    lokasiAwal: "Cisitu",
    lokasiAkhir: "Tegalega",
    rute: [
      { namaJalan: "Terminal Cisitu" },
      { namaJalan: "Jalan Cisitu Lama VIII" },
      { namaJalan: "Jalan Cisitu" },
      { namaJalan: "Jalan Sangkuriang" },
      { namaJalan: "Jalan Siliwangi" },
      { namaJalan: "Jalan Sumur Bandung" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "Jalan Siliwangi" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cicendo" },
      { namaJalan: "Jalan Kebon Kawung" },
      { namaJalan: "Stasiun Bandung (Kebon Kawung)" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Jalan Suniaraja" },
      { namaJalan: "Terminal Stasiun" },
      { namaJalan: "Jalan Dulatip" },
      { namaJalan: "Pasar Baru" },
      { namaJalan: "Jalan Sudirman" },
      { namaJalan: "Jalan Astana Anyar" },
      { namaJalan: "Jalan Kalipah Apo" },
      { namaJalan: "Jalan Otto Iskandardinata (Otista)" },
      { namaJalan: "Terminal Tegalega" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9345,
          longitude: 107.6164,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["ungu", "hijau"],
        },
      ],
    },
  },
});

// Rute TEGALEGA → CISITU
const trayekTegalegaToCisitu = await prisma.trayek.create({
  data: {
    namaTrayek: "TEGALEGA → CISITU",
    lokasiAwal: "Tegalega",
    lokasiAkhir: "Cisitu",
    rute: [
      { namaJalan: "Terminal Tegalega" },
      { namaJalan: "Jalan Astana Anyar" },
      { namaJalan: "Jalan Panjunan" },
      { namaJalan: "Jalan Kopo" },
      { namaJalan: "Jalan Pasir Koja" },
      { namaJalan: "Jalan Pajagalan" },
      { namaJalan: "Jalan Gardu Jati" },
      { namaJalan: "Jalan Suniaraja" },
      { namaJalan: "Terminal Stasiun" },
      { namaJalan: "Jalan Otista" },
      { namaJalan: "Jalan Stasiun Timur" },
      { namaJalan: "Viaduct" },
      { namaJalan: "Jalan Kebon Jukut" },
      { namaJalan: "Jalan Kebon Kawung" },
      { namaJalan: "Stasiun Bandung (Kebon Kawung)" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "UNISBA & UNPAS (Tamansari)" },
      { namaJalan: "Jalan Tamansari" },
      { namaJalan: "ITB" },
      { namaJalan: "Jalan Siliwangi" },
      { namaJalan: "Jalan Sangkuriang" },
      { namaJalan: "Jalan Cisitu" },
      { namaJalan: "Jalan Cisitu Lama" },
      { namaJalan: "Jalan Cisitu Lama VIII" },
      { namaJalan: "Terminal Cisitu" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9202,
          longitude: 107.6233,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["ungu", "hijau"],
        },
      ],
    },
  },
});

// Rute CIUMBULEUIT → ST. HALL
const trayekCiumbuleuitToStHall = await prisma.trayek.create({
  data: {
    namaTrayek: "CIUMBULEUIT → ST. HALL",
    lokasiAwal: "Ciumbuleuit",
    lokasiAkhir: "St Hall",
    rute: [
      { namaJalan: "Terminal Ciumbuleuit" },
      { namaJalan: "Jalan Ciumbuleuit" },
      { namaJalan: "UNPAR (Ciumbuleuit)" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Bapa Husen" },
      { namaJalan: "Jalan Sederhana" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "RS. Hasan Sadikin" },
      { namaJalan: "Jalan Pasteur" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Rivai" },
      { namaJalan: "Jalan Cipto" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cicendo" },
      { namaJalan: "Jalan Kebon Kawung" },
      { namaJalan: "Stasiun Bandung (Kebon Kawung)" },
      { namaJalan: "Jalan Pasir Kaliki" },
      { namaJalan: "Jalan Kebon Jati" },
      { namaJalan: "Terminal Stasiun" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9001,
          longitude: 107.6012,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["ungu", "hijau"],
        },
      ],
    },
  },
});

// Rute ST. HALL → CIUMBULEUIT
const trayekStHallToCiumbuleuit = await prisma.trayek.create({
  data: {
    namaTrayek: "ST. HALL → CIUMBULEUIT",
    lokasiAwal: "St Hall",
    lokasiAkhir: "Ciumbuleuit",
    rute: [
      { namaJalan: "Terminal Stasiun" },
      { namaJalan: "Jalan Suniaraja" },
      { namaJalan: "Jalan Otista" },
      { namaJalan: "Jalan Stasiun Timur" },
      { namaJalan: "Viaduct" },
      { namaJalan: "Jalan Perintis Kemerdekaan" },
      { namaJalan: "Jalan Wastu Kencana" },
      { namaJalan: "Jalan Pajajaran" },
      { namaJalan: "Jalan Cihampelas" },
      { namaJalan: "Jalan Rivai" },
      { namaJalan: "Jalan Cipaganti" },
      { namaJalan: "Jalan Eyckman" },
      { namaJalan: "Jalan Sederhana" },
      { namaJalan: "Jalan Sempuna" },
      { namaJalan: "Jalan Cipaganti" },
      { namaJalan: "Jalan Setiabudi" },
      { namaJalan: "Jalan Ciumbuleuit" },
      { namaJalan: "UNPAR (Ciumbuleuit)" },
      { namaJalan: "Terminal Ciumbuleuit" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9118,
          longitude: 107.6087,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["ungu", "hijau"],
        },
      ],
    },
  },
});

// Rute CIWASTRA → TEGALEGA
const trayekCiwastraToTegalega = await prisma.trayek.create({
  data: {
    namaTrayek: "CIWASTRA → TEGALEGA",
    lokasiAwal: "Ciwastra",
    lokasiAkhir: "Tegalega",
    rute: [
      { namaJalan: "Terminal Ciwastra" },
      { namaJalan: "Jalan Ciwastra" },
      { namaJalan: "Jalan Margacinta" },
      { namaJalan: "Jalan Terusan Buah Batu" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Moh. Toha" },
      { namaJalan: "Jalan Pungkur" },
      { namaJalan: "Terminal Kebon Kelapa" },
      { namaJalan: "Jalan Otto Iskandardinata" },
      { namaJalan: "Terminal Tegalega" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9499,
          longitude: 107.5951,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["ungu", "hijau"],
        },
      ],
    },
  },
});

// Rute TEGALEGA → CIWASTRA
const trayekTegalegaToCiwastra = await prisma.trayek.create({
  data: {
    namaTrayek: "TEGALEGA → CIWASTRA",
    lokasiAwal: "Tegalega",
    lokasiAkhir: "Ciwastra",
    rute: [
      { namaJalan: "Terminal Tegalega" },
      { namaJalan: "Jalan Tegalega" },
      { namaJalan: "Jalan Moh. Toha" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Jalan Terusan Buah Batu" },
      { namaJalan: "Jalan Margacinta" },
      { namaJalan: "Jalan Ciwastra" },
      { namaJalan: "Terminal Ciwastra" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9410,
          longitude: 107.6122,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["ungu", "hijau"],
        },
      ],
    },
  },
});

// Rute DAGO → RIUNG BANDUNG
const trayekDagoToRiungBandung = await prisma.trayek.create({
  data: {
    namaTrayek: "DAGO → RIUNG BANDUNG",
    lokasiAwal: "Dago",
    lokasiAkhir: "Riung Bandung",
    rute: [
      { namaJalan: "Terminal Dago" },
      { namaJalan: "Jalan Ir. H. Juanda (Dago)" },
      { namaJalan: "Simpang Dago" },
      { namaJalan: "Jalan Dipati Ukur" },
      { namaJalan: "Jalan Panatayuda" },
      { namaJalan: "Jalan Surapati (Suci)" },
      { namaJalan: "Jalan Sentot Alibasyah" },
      { namaJalan: "Jalan Diponegoro" },
      { namaJalan: "Jalan Citarum" },
      { namaJalan: "Jalan RE. Martadinata" },
      { namaJalan: "Jalan Laswi" },
      { namaJalan: "Jalan Sukabumi" },
      { namaJalan: "Jalan Ahmad Yani" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Margahayu Raya (Sukarno-Hatta)" },
      { namaJalan: "Metro (Sukarno-Hatta)" },
      { namaJalan: "Jalan Cipamolokan (Riung Bandung)" },
      { namaJalan: "Jalan Riung Bandung" },
      { namaJalan: "Terminal Riung Bandung" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9023,
          longitude: 107.6231,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["putih", "hijau"],
        },
      ],
    },
  },
});

// Rute RIUNG BANDUNG → DAGO
const trayekRiungBandungToDago = await prisma.trayek.create({
  data: {
    namaTrayek: "RIUNG BANDUNG → DAGO",
    lokasiAwal: "Riung Bandung",
    lokasiAkhir: "Dago",
    rute: [
      { namaJalan: "Terminal Riung Bandung" },
      { namaJalan: "Jalan Riung Bandung" },
      { namaJalan: "Jalan Cipamolokan (Riung Bandung)" },
      { namaJalan: "Jalan Sukarno-Hatta" },
      { namaJalan: "Metro (Sukarno-Hatta)" },
      { namaJalan: "Margahayu Raya (Sukarno-Hatta)" },
      { namaJalan: "Jalan Kiara Condong" },
      { namaJalan: "Jalan Jakarta" },
      { namaJalan: "Jalan Sukabumi" },
      { namaJalan: "Jalan Laswi" },
      { namaJalan: "Jalan RE. Martadinata" },
      { namaJalan: "Jalan Anggrek" },
      { namaJalan: "Jalan Gudang Utara" },
      { namaJalan: "Jalan Patra Komala" },
      { namaJalan: "Jalan Belitung" },
      { namaJalan: "Jalan Banda" },
      { namaJalan: "Jalan Diponegoro" },
      { namaJalan: "Jalan Aria Jipang" },
      { namaJalan: "Jalan Surapati (Suci)" },
      { namaJalan: "Jalan Panatayuda" },
      { namaJalan: "Jalan Dipati Ukur" },
      { namaJalan: "Simpang Dago" },
      { namaJalan: "Jalan Ir. H. Juanda" },
      { namaJalan: "Terminal Dago" },
    ],
    angkots: {
      create: [
        {
          nomorKendaraan: generateNomorKendaraan(),
          latitude: -6.9000,
          longitude: 107.6110,
          jumlahKursi: 12,
          activeNonActive: true,
          warna: ["putih", "hijau"],
        },
      ],
    },
  },
});


  // Seed Angkot untuk Trayek 1
  const angkot1 = await prisma.angkot.create({
    data: {
      latitude: -6.914744,
      longitude: 107.60981,
      jumlahKursi: 12,
      activeNonActive: true,
      warna: ["hijau", "kuning"],
      currentTrayekId: trayek1.id,
      nomorKendaraan: "D 1236 XYX",
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
      nomorKendaraan: "D 1237 XYX",
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
