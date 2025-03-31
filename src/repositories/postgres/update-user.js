import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresUpdateUserRepository {
    async execute(userId, updateParams) {
        const updateFields = []
        const udpateValues = []

        Object.keys(updateParams).forEach((key) => {
            updateFields.push(`${key} = ${udpateValues.length + 1}`)
            udpateValues.push(updateParams[key])
        })

        udpateValues.push(userId)

        const updateQuery = `
        UPDATE users
        SET ${updateFields.join(', ')}
        WHERE id = ${udpateValues.length}
        RETURNING *
      `

        const updateUser = await PostgresHelper.query(updateQuery, udpateValues)

        return updateUser[0]
    }
}
