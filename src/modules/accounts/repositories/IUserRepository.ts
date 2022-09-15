import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  listAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };
