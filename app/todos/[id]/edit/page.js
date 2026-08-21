import { getTodoById } from "@/lib/todos";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditTodoForm from "@/components/todos/EditTodoForm";
import styles from "../../todo-form.module.css";


export async function generateMetadata({params}){
    const {id} = await params;
    const todo = await getTodoById(id)

    if(!todo) return { title: "Todo Not Found"};
    return {title: `Edit: ${todo.title}`};
}

export default async function EditTodoPage({params}){
    const {id} = await params;
    const todo = await getTodoById(id);

    if(!todo){
        notFound()
    }

    return(
        <main className={styles.container}>
            <Link href={`/todos/${id}`} className={styles.backLink}>← Back to Details</Link>
            <div className={styles.formCard}>
                <h1 className={styles.title}>Edit Task</h1>
                <EditTodoForm todo={todo} />
            </div>
        </main>
    )
}