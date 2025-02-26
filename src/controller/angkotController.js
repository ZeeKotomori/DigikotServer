import { PrismaClient } from "@prisma/client";
import redis from "../config/redis.js";

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
                },
                include : {
                    currentTrayek : true
                }
            })

            if (!angkot) return res.status(404).send("data not found");
            
            return res.status(200).send(angkot);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async updateAngkot(req , res) {
        const { id } = req.params;
        const { latitude, longitude, jumlahKursi, activeNonActive, warna, currentTrayekId, nomorKendaraan } = req.body;
        try {
            const angkot = await prisma.angkot.update({
            where: { 
                id : id 
            },
            data: {
                latitude,
                longitude,
                jumlahKursi,
                activeNonActive,
                warna,
                currentTrayekId,
                nomorKendaraan
            },
        });
        return res.status(200).send(angkot);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async deleteAngkot(req, res) {
        const { id } = req.params;

        try {
            await prisma.angkot.delete({
                where : {
                    id : id 
                }
            })
            return res.status(200).send({ msg : "Angkot Has Been Deleted" });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async getAngkotStatus(req, res) {
        const { id } = req.params;
        const redisKey = `angkot:${id}`;
    
        try {
            const data = await redis.hgetall(redisKey);
            if (!data) return res.status(404).json({ msg: "Angkot tidak ditemukan" });
    
            return res.json({ active: data.active === "true" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    static async searchAngkot(req, res) {
        const { trayekId, active } = req.query;
    
        try {
            let whereClause = {};
    
            if (trayekId) {
                whereClause.id = String(trayekId);
            }
    
            if (active !== undefined) {
                whereClause.activeNonActive = active.toLowerCase() === "true";
            }
    
            const angkots = await prisma.angkot.findMany({ 
                where: { 
                    currentTrayekId: whereClause.id,
                    activeNonActive: whereClause.activeNonActive
                },
            });
            
            console.log(angkots);

            return res.status(200).send({ msg : "angkot found", angkots });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }
    
}

export default AngkotController;