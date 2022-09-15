import { Router } from "express";

import { UserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new UserController();

userRoutes.post("/", createUserController.create);

userRoutes.use(ensureAuthenticated);

userRoutes.get("/", createUserController.listAll);
userRoutes.delete("/:id", createUserController.delete);

export { userRoutes };
