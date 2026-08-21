import { getTodos } from "@/lib/todos";
import TodoListClient from "@/components/todos/TodoListClient";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "All Todos",
    description: "Browse, manage and track all your todos in one place"
};

export default async function TodoListPage() {
    const todos = await getTodos();
    return <TodoListClient initialTodos={todos} />
}

