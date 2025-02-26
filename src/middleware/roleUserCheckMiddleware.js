import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkUserRole = (allowedRoles) => {
    return async (req, res, next) => {
        const username = req.user.username;

        if (!username) return res.status(401).send({ error: "Access denied. No token provided." });

        try {
            const user = await prisma.user.findUnique({
                where: { username },
                select: { role: true },
            });

            if (!user) {
                return res.status(404).send({ error: "User not found" });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).send({ error: "Access denied" });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Internal Server Error" });
        }
    };
}