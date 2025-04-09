import { prisma } from '../../../../prisma/prisma.js' // Use @prisma/client, não o caminho local
export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        return user
    }
}
