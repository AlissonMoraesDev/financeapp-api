import { CreateUserController } from './create-user'

describe('Create User Controller', () => {
    it('should create an user', async () => {
        // arrange
        const createUserController = new CreateUserController()

        // act
        const httpRequest = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        }

        const result = await createUserController.execute(httpRequest)
        // assert
        expect(result.statusCode).toBe(201)
    })
})
