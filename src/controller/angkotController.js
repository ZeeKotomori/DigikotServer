import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AngkotController {
    static async getAngkots(req, res) { 
        try {
            const angkots = await prisma.angkot.findMany({
                include : {
                    AngkotTrayeks : true
                }
            }
            );
            res.status(200).send(angkots);
        } catch (error) {
            
        }
    }
}

export default AngkotController;