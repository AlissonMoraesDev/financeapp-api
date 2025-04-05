import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const invalidPasswordResponse = () =>
    badRequest({
        message: `Password must be at least 6 characters`,
    })

export const emailIsAlreadyInUseResponse = () =>
    badRequest({
        message: `Invalid E-mail. Please provide a valid one.`,
    })

export const invalidUserResponse = () =>
    notFound({
        message: 'User not found!',
    })

export const userNotFoundResponse = () =>
    notFound({ message: 'User not found.' })

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)
