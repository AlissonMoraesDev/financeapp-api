import validator from 'validator'
import { badRequest } from './http.js'

export const checkIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () =>
    badRequest({
        message: `The provided id is not valid.`,
    })
