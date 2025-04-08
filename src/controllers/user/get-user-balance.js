import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
    }

    async execute(httpResquest) {
        try {
            const userId = httpResquest.params.userId

            const idIsValid = checkIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const balance = await this.getUserBalanceUseCase.execute({ userId })

            return ok(balance)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            console.log(error)
            return serverError()
        }
    }
}
