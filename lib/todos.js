import fs from "node:fs/promises";
import path from "node:path";

const isVercel = process.env.VERCEL === '1';
const localFilePath = path.join(process.cwd(), 'data', 'todos.json');
const tmpFilePath = path.join('/tmp', 'todos.json');

const filePath = isVercel ? tmpFilePath : localFilePath;

let initPromise = null;

function initFile() {
  if (!isVercel) return Promise.resolve();
  if (!initPromise) {
    initPromise = (async () => {
      try {
        await fs.access(tmpFilePath);
      } catch {
        try {
          const initialData = await fs.readFile(localFilePath, "utf8");
          await fs.writeFile(tmpFilePath, initialData, "utf8");
        } catch (error) {
          console.error("Error copying todos.json to /tmp:", error);
        }
      }
    })();
  }
  return initPromise;
}

export async function getTodos() {
  await initFile();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveTodos(todos){
  await initFile();
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2), "utf8");
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