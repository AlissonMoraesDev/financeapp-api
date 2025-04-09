import { prisma } from '../../../../prisma/prisma.js' // Use @prisma/client, não o caminho local
export class PostgresGetUserByEmailRepository {
    async execute(email) {
        console.log('Prisma Client:', prisma) // Verifica se o Prisma Client está sendo instanciado corretamente
        console.log('Buscando usuário por email:', email) // Verifica o valor do email

        const user = await prisma.user.findUnique({
            where: { email },
        })

        console.log('Usuário encontrado:', user) // Verifica o usuário retornado

        return user
    }
}
