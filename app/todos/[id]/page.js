import { getTodoById } from "@/lib/todos";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import DeleteButton from "@/components/todos/DeleteButton";

export const dynamic = "force-dynamic";


export async function generateMetadata({params}){
    const {id} = await params;
    const todo = await getTodoById(id);

    if(!todo){
        notFound();
    }

    return {
        title: todo.title,
        description : todo.description,
    }
}

function formatDate(dateStr){
    return new Date(dateStr).toLocaleDateString("en-GB",{
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

function getPriorityClass(priority){
    switch(priority?.toLowerCase()){
        case "high": return styles.priorityHigh;
        case "medium": return styles.priorityMedium;
        case "low" : return styles.priorityLow;
        default: return styles.priorityLow
    }
}


function getStatusClass(status){
    switch(status?.toLowerCase()){
        case "completed": return styles.statusCompleted;
        case "in-progress": return styles.statusInProgress;
        case "pending" : return styles.statusPending;
        default: return styles.statusPending;
    }
}

export default async function TodoDetailPage({params}){
    const {id} = await params;
    const todo = await getTodoById(id);

    if(!todo){
        notFound();
    }

    return(
        <main className={styles.container}>
            <Link href="/todos" className={styles.backLink}>← Back to Todos</Link>

            <article className={styles.card} aria-label={`Todo: ${todo.title}`}>
                <div className={styles.cardHeader}>
                    <h1 className={styles.title}>{todo.title}</h1>
                    <span 
                    className={`${styles.priorityBadge} ${getPriorityClass(todo.priority)}`} aria-label={`priority: ${todo.priority}`}>
                        {todo.priority}</span>
                </div>

                <hr className={styles.divider} />

                <dl className={styles.details}>
                    <div className={styles.detailRow}>
                        <dt className={styles.detailLabel}>Description</dt>
                        <dd className={styles.detailValue}>{todo.description}</dd>
                    </div>

                    <div className={styles.detailRow}>
                        <dt className={styles.detailLabel}>Priority</dt>
                        <dd className={styles.detailValue}>
                            <span
                            className={`${styles.priorityBadge} ${getPriorityClass(todo.priority)}`}
                            >
                                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                            </span>
                        </dd>
                    </div>

                    <div className={styles.detailRow}>
                        <dt className={styles.detailLabel}>Due Date</dt>
                        <dd className={styles.detailValue}>{formatDate(todo.dueDate)}</dd>
                    </div>

                    <div className={styles.detailRow}>
                        <dt className={styles.detailLabel}>Status</dt>
                        <dd className={styles.detailValue}>
                            <span
                            className={`${styles.statusPill} ${getStatusClass(todo.status)}`}
                            >
                                {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                            </span>
                        </dd>
                    </div>
                </dl>

                <div className={styles.actions}>
                    <Link 
                    href={`/todos/${todo.id}/edit`}
                    className={`${styles.btn} ${styles.btnEdit}`}
                    id={`edit-todo-${todo.id}`}>
                        Edit Todo
                    </Link>

                    <DeleteButton 
                    id={todo.id}
                    todoTitle={todo.title}
                    className={`${styles.btn} ${styles.btnDelete}`}
                    redirectTo="/todos"
                    label="Delete todo"
                    />

                    <Link href="/todos" className={`${styles.btn} ${styles.btnBack}`}>
                        ← Back to Todos
                    </Link>

                </div>
            </article>
        </main>
    )
}