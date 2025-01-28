import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TrayekController { 
    static async findTrayek(req, res) {
        const { start, end } = req.body;
    
        try {
            // Cari trayek yang memiliki rute sesuai dengan start dan end
            const trayeks = await prisma.trayek.findMany({
                where: {
                    rute: {
                        array_contains: [
                            { namaJalan: start },
                            { namaJalan: end }
                        ],
                    },
                },
            });
    
            console.log(trayeks);
    
            // Filter trayek yang valid (start berada sebelum end dalam urutan rute)
            const validTrayeks = trayeks.map((trayek) => {
                const rute = trayek.rute;  // Mengakses rute langsung dari trayek
                const startIndex = rute.findIndex((r) => r.namaJalan === start);
                const endIndex = rute.findIndex((r) => r.namaJalan === end);
    
                // Pastikan 'start' dan 'end' ditemukan, dan 'start' berada sebelum 'end'
                if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
                    // Potong array rute hingga endIndex
                    trayek.rute = rute.slice(startIndex, endIndex + 1);
                    return trayek;
                }
                return null;  // Jika tidak valid, kembalikan null
            }).filter(Boolean);  // Hapus null dari array validTrayeks
    
            // Jika tidak ada trayek yang valid ditemukan
            if (validTrayeks.length === 0) {
                return res.status(404).send({ msg: "No Trayeks found for the given route or maybe you input wrong Address" });
            }
    
            // Kembalikan trayek yang valid dengan rute yang dipotong
            return res.status(200).send({ msg: "Trayeks found", data: validTrayeks });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async createTrayek(req, res){
        const { namaTraykes, lokasiAwal, lokasiAkhir, rute } = req.body;
        if(!namaTraykes || !lokasiAwal || !lokasiAkhir || !rute) return res.status(400).send({ msg: "All fields are required" });

        try {
            const trayekExist = await prisma.trayek.findFirst({
                where: { namaTrayek: namaTraykes },
            });

            if(trayekExist) return res.status(400).send({ msg: "Trayek already exist" });

            const trayek = await prisma.trayek.create({
                data: {
                    namaTrayek: namaTraykes,
                    lokasiAwal,
                    lokasiAkhir,
                    rute: {
                        rute
                    },
                },
            });

            return res.status(201).json({
                msg: "Trayek created",
                data: trayek,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async getAllTrayeks(req, res){
        try {
            const trayeks = await prisma.trayek.findMany();

            return res.status(200).send({
                trayeks
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async updateTrayek(req, res){
        const { id } = req.params;
        const { namaTrayek, lokasiAwal, lokasiAkhir, rute } = req.body;

        try {
            const existingTrayek = await prisma.trayek.findUnique({ where: { id } });
            if (!existingTrayek) return res.status(404).send({ msg: "Trayek not found" });

            const trayekWithSameName = await prisma.trayek.findFirst({
                where: { namaTrayek: namaTrayek, id: { not: id } },
            });
            if (trayekWithSameName) return res.status(400).send({ msg: "namaTrayek has been used" });

            const updatedTrayek = await prisma.trayek.update({
                where: { id: id },
                data: { namaTrayek, lokasiAwal, lokasiAkhir, rute },
            });
            
            return res.status(200).send({ msg: "Trayek updated", data: updatedTrayek });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    // static async findMultiTrayek(req, res) {
    //     const { start, end } = req.body;

    //     try {
    //         // Query Prisma untuk trayek yang memiliki start ATAU end dalam rutenya
    //         const trayeks = await prisma.trayek.findMany({
    //             where: {
    //                 rute: {
    //                     array_contains: [{ namaJalan: start }, { namaJalan: end }],
    //                 },
    //             },
    //         });

    //         // Proses trayek yang ditemukan untuk mencocokkan rute multi trayek
    //         const validTrayeks = [];
    //         trayeks.forEach(trayek => {
    //             const rute = trayek.rute;

    //             // Cari index 'start' dan 'end'
    //             const startIndex = rute.findIndex(r => r.namaJalan === start);
    //             const endIndex = rute.findIndex(r => r.namaJalan === end);

    //             // Validasi 'start' sebelum 'end'
    //             if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    //                 // Potong rute sesuai dari 'start' hingga 'end'
    //                 const rutePotong = rute.slice(startIndex, endIndex + 1);
    //                 validTrayeks.push({
    //                     ...trayek,
    //                     rute: rutePotong, // Ganti rute dengan potongan rute yang valid
    //                 });
    //             }
    //         });

    //         if (validTrayeks.length === 0) {
    //             return res.status(404).json({
    //                 msg: "No connected Trayeks found for the given route.",
    //             });
    //         }

    //         return res.status(200).json({
    //             msg: "Trayeks found",
    //             data: validTrayeks,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).send("Internal Server Error");
    //     }
    // }
}

export default TrayekController;