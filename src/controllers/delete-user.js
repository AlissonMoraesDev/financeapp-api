import { DeleteUserUseCase } from '../use-cases/delete-user'
import {
    serverError,
    checkIfIdUserIsValid,
    invalidIdResponse,
} from './helpers.js'

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

            return deletedUser
        } catch (error) {
            console.log(error)
            return serverError
        }
    }
}
