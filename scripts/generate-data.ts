import { faker } from "@faker-js/faker";
import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

const program = new Command();

program.option(
  "--todo-list <number>",
  "Number of todo items to generate",
  "100"
);

program.parse(process.argv);

const { todoList } = program.opts();

const generateRandomTodoList = (count: number = 100): Todo[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    completed: faker.datatype.boolean(),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }));
};

const data = {
  todos: generateRandomTodoList(parseInt(todoList, 10)),
};

const outputFile = "db.json";

fs.writeFileSync(
  path.resolve(__dirname, "..", outputFile),
  JSON.stringify(data, null, 2),
  "utf8"
);

console.log(
  `Data generated successfully: ${todoList} todos written to ${outputFile}.`
);
