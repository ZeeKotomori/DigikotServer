import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
    static async userUpdate(req, res) {
        const { id } = req.params;
        const { name, username, email, password } = req.body;

        try {
            const exitingUsername = await prisma.user.findFirst({
                where: {
                    username : username,
                    NOT: {
                        id : id
                    }
                }
            });

            if (exitingUsername) return res.status(400).send({msg : "username alaready exists."});

            const user = await prisma.user.update({
                where : {
                    id : id
                },
                data : {
                    name,
                    username,
                    email,
                    password
                },
            });

            return res.status(200).send({ msg : "account has been updated", user });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await prisma.user.findMany({
                include : {
                    angkot : true
                }
            });
            return res.status(200).send({users});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params

        if (!id) return res.status(400).send({ msg : "id must been filled" });
        
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id : id
                },
                include : {
                    angkot : true
                }
            });
            return res.status(200).send({ user });
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

        try {
            if (!idAngkot) return res.status(400).send({ msg : "Angkot Must Been Choose" });
            
            const angkot = await prisma.angkot.findUnique({
                where: { id: idAngkot },
                select: { supirId: true },
            });
    
            if (!angkot) return res.status(404).send({ error: "Angkot not found" });
            
            // jika angkot sudah memiliki supir (supirId) dan supirId bukan lah id yang sedang di gunakan maka return error handler
            if (angkot.supirId && angkot.supirId !== id) return res.status(400).send({ error: "The public transportation has been used by another driver" });

            const currentAngkot = await prisma.angkot.findFirst({
                where: { supirId: id },
            });

            if (currentAngkot) {
                // Unsign dari angkot lama
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

    static async deleteUser(req, res) {
        const { id } = req.params
        

        try {
            const user = await prisma.user.findUnique({
                where : {
                    id : id
                }
            });

            if (!user) {
                return res.status(404).send({ msg: "User not found" });
            }

            await prisma.angkot.updateMany({
                where: { supirId: id },
                data: { supirId: null },
            });

            await prisma.user.delete({
                where: { id },
            });

            return res.status(200).send({ msg: "User and related assignments have been successfully deleted" });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }
}

export default UserController;