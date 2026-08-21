import {getTodos, saveTodos} from "@/lib/todos";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const todos = await getTodos();
        return NextResponse.json(todos);
    }catch(error){
        return NextResponse.json({error: "Failed to fetch todos"}, {status: 500})
    }
}

export async function POST(request){
    try{
        const body = await request.json();
        const { title, description, priority, dueDate, status} = body;

        if(!title){
            return NextResponse.json({error: "Title is required"}, {status: 400});
        }

        const todos = await getTodos();
        const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

        const newTodo = {
            id: newId,
            title,
            description: description || "",
            priority: priority || "medium",
            dueDate: dueDate || new Date().toISOString().split("T")[0],
            status: status || "Pending",
        }

        todos.push(newTodo);
        await saveTodos(todos);

        return NextResponse.json(newTodo, {status: 201});
    }catch(error){
        return NextResponse.json({error: "Failed to create todo"}, {status: 500});
    }
}