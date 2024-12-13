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
}