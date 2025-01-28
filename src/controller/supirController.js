import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SupirController{
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