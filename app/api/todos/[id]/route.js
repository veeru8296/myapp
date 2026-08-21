import { NextResponse } from "next/server";
import { getTodos, saveTodos} from "@/lib/todos";

export async function GET(request, {params}){
    try{
        const {id} = await params;
        const todos = await getTodos();
        const todo = todos.find((t) => t.id === parseInt(id, 10));

        if(!todo){
            return NextResponse.json({error: "Todo not found"}, {status: 404});
        }

        return NextResponse.json(todo);
    }catch(error){
        return NextResponse.json({error: "Failed to fetch todo"}, {status: 500});
    }
}

export async function PUT(request, {params}){
    try{
        const {id} = await params;
        const body = await request.json();
        const { title, description, priority, dueDate, status} = body;

        const todos = await getTodos();
        const index = todos.findIndex((t) => t.id === parseInt(id, 10));

        if(index === -1){
            return NextResponse.json({error: "Todo not found"}, {status: 404});
        }

        todos[index] = {...todos[index],
            title: title !== undefined ? title : todos[index].title,
            description: description !== undefined ? description : todos[index].description,
            priority: priority !== undefined ? priority : todos[index].priority,
            dueDate: dueDate !== undefined ? dueDate : todos[index].dueDate,
            status: status !== undefined ? status : todos[index].status
        };

        await saveTodos(todos);
        return NextResponse.json(todos[index]);
    }catch(error){
        return NextResponse.json({error: "Failed to update todo"}, {status: 500});
    }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const todos = await getTodos();
    const index = todos.findIndex((t) => t.id === parseInt(id, 10));
    if (index === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    todos.splice(index, 1);
    await saveTodos(todos);
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
