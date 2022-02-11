import { inject } from "tsyringe";
import { ICreatedUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute({
        name,
        username,
        email,
        password,
        driver_license
    }: ICreatedUserDTO): Promise<void> {
        await this.userRepository.create({
            name,
            username,
            email,
            password,
            driver_license
        });
    }
}