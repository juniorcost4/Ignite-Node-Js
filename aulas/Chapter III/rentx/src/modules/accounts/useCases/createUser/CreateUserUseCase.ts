import { inject, injectable } from "tsyringe";
import { ICreatedUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute({
        name,
        email,
        password,
        driver_license
    }: ICreatedUserDTO): Promise<void> {
        this.userRepository.create({
            name,
            email,
            password,
            driver_license
        });
    }
}

export { CreateUserUseCase };