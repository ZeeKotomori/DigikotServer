import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
    static async userCreate(req, res) {
        const { name, username, email, password} = req.body;
        if(!name, !username, !email, !password) return res.status(400).send({ msg : "field must been filled" });

        try {
            const exitingUsername = await prisma.user.findFirst({
                where: {
                    username : username
                }
            });

            if (exitingUsername) return res.status(400).send({msg : "username alaready exists."});
            const HashPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data : {
                    name,
                    username,
                    email,
                    password : HashPassword
                }
            });

            return res.status(201).send({ msg : "User Has Been Created", user : user });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
    }

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