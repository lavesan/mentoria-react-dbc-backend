import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";
import { Repository } from "typeorm";
import AppDataSource from "../../../../../ormconfig";

class SpecificationRepository implements ISpecificationRepository {
  private readonly repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    await this.repository.save({
      name,
      description,
    });
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ where: { name } });
  }
}

export { SpecificationRepository };
