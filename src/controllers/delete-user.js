import { DeleteUserUseCase } from '../use-cases/index.js'
import {
    serverError,
    checkIfIdUserIsValid,
    invalidIdResponse,
    ok,
    userNotFoundResponse,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIfIdUserIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return userNotFoundResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
