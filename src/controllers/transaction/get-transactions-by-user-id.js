import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIdIsValid,
    invalidIdResponse,
    requiredFieldMissingresponse,
    serverError,
    userNotFoundResponse,
    ok,
} from '../helpers'

export class GetTransactionsByUserId {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            if (!userId) {
                return requiredFieldMissingresponse('userId')
            }

            const userIdIsValid = checkIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                })

            return ok(transactions)
        } catch (error) {
            console.log(error)
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }

            return serverError()
        }
    }
}
