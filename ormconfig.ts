import { DataSource } from "typeorm";
import { User } from "./src/modules/accounts/entities/User";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/database.sqlite",
  subscribers: [],
  migrations: ["./src/database/migration/*.ts"],
  entities: [User],
});

export function createConnection(): Promise<DataSource> {
  return AppDataSource.initialize();
}

export default AppDataSource;
