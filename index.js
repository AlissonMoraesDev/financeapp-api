import express from 'express'
import 'dotenv/config.js'
import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js'
import {
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
} from './src/use-cases/index.js'
import {
    PostgresCreateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
} from './src/repositories/postgres/index.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUerByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUerByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
    const createUserRepository = new PostgresCreateUserRepository()

    const createUserUseCase = new CreateUserUseCase(createUserRepository)

    const createUserController = new CreateUserController(createUserUseCase)

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserRepository = new PostgresUpdateUserRepository()

    const updateUserUseCase = new UpdateUserUseCase(updateUserRepository)

    const updateUserController = new UpdateUserController(updateUserUseCase)

    const { statusCode, body } = await updateUserController.execute(request)

    response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)

    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    const { statusCode, body } = await deleteUserController.execute(request)

    response.status(statusCode).send(body)
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
