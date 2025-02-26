import { PrismaClient } from "@prisma/client";
import redis from "../config/redis.js";

const prisma = new PrismaClient();
const timestamp = Date.now();

class SupirController{
    static async getMyAngkot(req, res) {
        try {
            const username = req.user.username;

            const angkot = await prisma.angkot.findFirst({
                where: { 
                    supir : {
                        username : username
                    } 
                },
            });

            if (!angkot) {
                return res.status(404).send({ 
                    msg: "you haven't selected angkot" });
            }

            return res.status(200).send({
                msg: "Successfully get the selected angkot",
                angkot
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Internal Server Error" });
        }
    }

    static async updateLocation(req, res) {
        const { username } = req.user;
        const { angkotId } = req.params;
        const { status, latitude, longitude, updatedAt } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).send("Latitude and Longitude are required.");
        }
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return res.status(400).send("Invalid latitude or longitude values.");
        }

        try {
            const supir = await prisma.user.findUnique({
                where : { username : username },
                include : {
                    angkot : true
                }
            });

            if (!supir || supir.angkot.id !== angkotId) return res.status(404).send("Supir tidak terhubung dengan angkot ini");
            const redisKey = `angkot:${angkotId}`;
            const existingData = await redis.hget(redisKey, "updatedAt");

            if (!existingData.updatedAt || updatedAt > existingData.updatedAt) {
                await redis.hmset(redisKey, {
                    latitude,
                    longitude,
                    active: status,
                    updatedAt,
                });
                await redis.expire(redisKey, 60);
            }

            return res.status(200).send({ msg : "Location has been updated successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async activeNonActiveAngkot(req, res) {
        const { username } = req.user;
        console.log(username);
        const { angkotId } = req.params;
        const { latitude, longitude, status } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).send("Latitude and Longitude are required.");
        }
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return res.status(400).send("Invalid latitude or longitude values.");
        }
    
        try {
            const supir = await prisma.user.findUnique({
                where : { username : username },
                include : {
                    angkot : true
                }
            });

            if (!supir || supir.angkot.id !== angkotId) return res.status(404).send("Supir tidak terhubung dengan angkot ini");

            await prisma.angkot.update({
                where : {
                    id : angkotId
                },
                data : {
                    latitude,
                    longitude,
                    activeNonActive : status
                }
            });

            const redisKey = `angkot:${angkotId}`;
            await redis.hmset(redisKey, {
                latitude,
                longitude,
                active: status,
                updatedAt: timestamp,
            });

            return res.status(200).send({ msg : "Angkot has been actived successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async removeDriverFromChooseAngkot(req, res) {
        const { id } = req.params;
        const { idAngkot } = req.body;

        try {
            if (!idAngkot) return res.status(400).send({ msg : "Angkot Must Been Choose" });
            
            const angkot = await prisma.angkot.findUnique({
                where: { id: idAngkot },
            });
    
            if (!angkot) return res.status(404).send({ msg: "Angkot not found" });

            if(angkot.supirId !== id) return res.status(400).send({ msg : "This driver is not assigned to the specified angkot" })

            const updatedAngkot = await prisma.angkot.update({
                where: { id: idAngkot },
                data: { supirId: null },
            });

            return res.status(200).send({ msg: "Driver has been successfully removed from the angkot", data: updatedAngkot });

        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async driverChooseAngkot(req, res) {
        const { id } = req.params;
        const { idAngkot } = req.body;
        if (!idAngkot) return res.status(400).send({ msg : "Angkot Must Been Choose" });

        try { 
            const angkot = await prisma.angkot.findUnique({
                where: { id: idAngkot },
                select: { supirId: true },
            });
            if (!angkot) return res.status(404).send({ error: "Angkot not found" });
            if (angkot.supirId && angkot.supirId !== id) return res.status(400).send({ error: "The public transportation has been used by another driver" });

            const currentAngkot = await prisma.angkot.findFirst({
                where: { supirId: id },
            });

            if (currentAngkot) {
                await prisma.angkot.update({
                    where: { id: currentAngkot.id },
                    data: { supirId: null },
                });
            }

            const updateAngkot = await prisma.angkot.update({
                where : {
                    id : idAngkot
                },
                data : {
                    supirId : id
                },
                include : {
                    supir : true
                }
            });

            return res.status(200).send({msg : "Driver Has Been Assigned to Angkot", updateAngkot});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }
}

export default SupirController ;