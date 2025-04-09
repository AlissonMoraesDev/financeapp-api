import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteTransaction {
    async execute(transactionId) {
        try {
            const transaction = await prisma.transaction.delete({
                where: {
                    id: transactionId,
                },
            })

            return transaction
        } catch (error) {
            return null
        }
    }
}
