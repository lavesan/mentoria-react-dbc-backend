import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../entities/User";
import { AppError } from "../../../../errors/AppError";

@injectable()
class UserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async create({ password, email, ...data }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError("User email already exists");

    const passwordHash = await hash(password, 8);

    this.userRepository.create({
      ...data,
      email,
      password: passwordHash,
    });
  }

  async listAll(): Promise<User[]> {
    return this.userRepository.listAll();
  }

  async delete(id: string): Promise<void> {
    const userAlreadyExists = await this.userRepository.findById(id);

    if (!userAlreadyExists) throw new AppError("User don't exists");

    await this.userRepository.delete(id);
  }
}

export { UserUseCase };
