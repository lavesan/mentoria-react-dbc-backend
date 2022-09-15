import { DataSource } from "typeorm";
import { User } from "./src/modules/accounts/entities/User";
import { Specification } from "./src/modules/cars/entities/Specification";
import { Category } from "./src/modules/cars/entities/Category";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/database.sqlite",
  subscribers: [],
  migrations: ["./src/database/migration/*.ts"],
  entities: [User, Specification, Category],
});

export function createConnection(): Promise<DataSource> {
  return AppDataSource.initialize();
}

export default AppDataSource;
