import { ICreatedUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
    create(data: ICreatedUserDTO): Promise<void>
}

export { IUsersRepository };