import { GetUserByIdUseCase } from '../use-cases/index.js'
import {
    checkIfIdUserIsValid,
    invalidIdResponse,
    userNotFoundResponse,
    ok,
    serverError,
} from './helpers/index.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdUserIsValid(httpRequest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return userNotFoundResponse()
            }

            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
