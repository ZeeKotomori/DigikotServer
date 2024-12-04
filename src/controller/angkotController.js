import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AngkotController {
    static async getAngkots(req, res) {
        try {
            const angkots = await prisma.angkot.findMany({
                include: {
                    currentTrayek: true
                }
            }
            );
            return res.status(200).send(angkots);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async createAngkot(req, res) {
        const { latitude, longitude, jumlahKursi, activeNonActive, warna, currentTrayekId, nomorKendaraan } = req.body;
        // console.log(req.body);
        
        if ([latitude, longitude, jumlahKursi, activeNonActive, warna, currentTrayekId, nomorKendaraan].some(value => value === null)) return res.status(400).send("Bad Request");
        try {
            const angkot = await prisma.angkot.create({
                data : {
                    latitude,
                    longitude,
                    jumlahKursi,
                    activeNonActive,
                    warna,
                    currentTrayekId,
                    nomorKendaraan
                }
            })
            return res.status(201).send(angkot);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error")
        }
    }

    static async getAngkotById(req, res) {
        const { id } = req.params;
        try {
            const angkot = await prisma.angkot.findUnique({
                where : {
                    id : id,
                },include : {
                    currentTrayek : true
                }
            })
            return res.status(200).send(angkot);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }
}

export default AngkotController;