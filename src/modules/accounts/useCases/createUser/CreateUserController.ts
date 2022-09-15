import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserUseCase } from "./CreateUserUseCase";

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body;

    const createUserUseCase = container.resolve(UserUseCase);

    await createUserUseCase.create({
      name,
      email,
      password,
      driver_license,
    });

    return res.status(201).send();
  }

  async listAll(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = container.resolve(UserUseCase);

    const users = await createUserUseCase.listAll();

    return res.status(201).json(users);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const createUserUseCase = container.resolve(UserUseCase);

    await createUserUseCase.delete(id);

    return res.status(201).send();
  }
}

export { UserController };
