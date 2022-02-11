import { getRepository, Repository } from "typeorm";
import { ICreatedUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        email,
        driver_license,
        password
    }: ICreatedUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password
        });

        await this.repository.save(user);
    }
}

export { UsersRepository };