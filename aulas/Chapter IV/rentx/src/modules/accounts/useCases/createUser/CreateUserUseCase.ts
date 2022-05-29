import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreatedUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/erros/AppError";

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
        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        this.userRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });
    }
}

export { CreateUserUseCase };