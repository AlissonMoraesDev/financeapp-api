import {
    badRequest,
    checkIdIsValid,
    checkIfAmountIsValid,
    checkIsTypeValid,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const idIsValid = checkIdIsValid(httpRequest.params.transactionId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            const allowFields = ['name', 'date', 'amount', 'type']

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not valid',
                })
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount)

                if (!amountIsValid) {
                    return invalidAmountResponse()
                }
            }

            if (params.type) {
                const typeIsValid = checkIsTypeValid(params.type)

                if (!typeIsValid) {
                    return invalidTypeResponse()
                }
            }

            const transaction = await this.updateTransactionUseCase.execute(
                httpRequest.params.transactionId,
                params,
            )

            return ok(transaction)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
