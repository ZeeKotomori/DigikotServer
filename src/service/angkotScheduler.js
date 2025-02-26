import cron from "node-cron";
import redis from "../config/redis.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const syncAngkotLocation = () => {
    cron.schedule("0 6,9,12,15,18,19 * * *", async () => {
        try {
            const keys = await redis.keys("angkot:*");

            for (const key of keys) {
                const angkotId = key.split(":")[1];
                const data = await redis.hgetall(key);

                if (data.active === "true") {
                    await prisma.angkot.update({
                        where: { id: parseInt(angkotId, 10) },
                        data: {
                            latitude: parseFloat(data.latitude),
                            longitude: parseFloat(data.longitude),
                        },
                    });

                    console.log(`Angkot ${angkotId} location has been synced to database.`);
                }
            }
        } catch (error) {
            console.error("Error while syncing angkot location", error);
        }
    });
};
