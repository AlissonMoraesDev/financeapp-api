import { prisma } from '../../../../prisma/prisma.js' // Use @prisma/client, não o caminho local

export class PostgresDeleteUserRepository {
    async execute(userId) {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: userId,
                },
            })

            return user
        } catch (error) {
            return null
        }
    }
}
