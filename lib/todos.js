import fs from "node:fs/promises";
import path from "node:path";

const filePath = path.join(process.cwd(), 'data', 'todos.json');

export async function getTodos() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveTodos(todos){
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2),"utf8");
}

export async function getTodoStats() {
  const todos = await getTodos();
  const total = todos.length;
  const completed = todos.filter((t) => t.status.toLowerCase() === "completed").length;
  const pending = todos.filter((t) => t.status.toLowerCase() !== "completed").length;
  return { total, completed, pending };
}

export async function getTodoById(id){
    const todos = await getTodos();
    return todos.find((t) => t.id === parseInt(id,10));
}