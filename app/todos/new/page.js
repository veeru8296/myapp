"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import styles from "../todo-form.module.css";

export default function AddTodoPage(){
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("Pending");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title.trim()) return;

        setLoading(true);
        setError("");

        try{
            const response = await fetch("/api/todos",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({title, description, dueDate, priority, status})
            });

            if(!response.ok){
                throw new Error("Failed to create todo")
            }

            router.push("/todos");
            router.refresh();
        }catch(error){
            setError(error.message || "An error occured")
        }finally{
            setLoading(false);
        }
    };

    return(
        <main className={styles.container}>
            <Link href="/todos" className={styles.backLink}>Back to Todos</Link>
            <div className={styles.formCard}>
                <h1 className={styles.title}>Add new Task</h1>
                {error && <div className={styles.errorAlert}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>Title <span className={styles.required}>*</span></label>
                        <input 
                        id="title"
                        type="text"
                        className={styles.input}
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea 
                        id="description"
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="describe work which needs to be done..."
                        rows={4}
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="priority" className={styles.label}>Priority <span className={styles.required}>*</span></label>
                            <select 
                              id="priority"
                              className={styles.select}
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}
                              required
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    

                    <div className={styles.formGroup}>
                        <label htmlFor="dueDate" className={styles.label}>Due Date <span className={styles.required}>*</span></label>
                        <input 
                        id="dueDate"
                        type="date"
                        className={styles.input}
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="status" className={styles.label}>Status<span className={styles.required}>*</span></label>
                        <select 
                        id="status"
                        className={styles.select}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Complete</option>
                        </select>
                    </div>
                </div>

                <button type="submit" disabled={loading} className={styles.submitBtn}>{loading ? "Adding..." : "Add Todo" }</button>
                </form>
            </div>
        </main>
    )
}