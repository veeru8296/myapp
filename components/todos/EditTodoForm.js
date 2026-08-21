"use client"

import styles from "@/app/todos/todo-form.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditTodoForm({todo}){
    const router = useRouter();
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || "");
    const [priority, setPriority] = useState(todo.priority || "Medium");
    const [dueDate, setDueDate] = useState(todo.dueDate || "");
    const [status, setStatus] = useState(todo.status || "Pending");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError("");

    try{
        const response = await fetch(`/api/todos/${todo.id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, description, priority, dueDate, status}),
        });

        if(!response.ok){
            throw new Error("Failed to update todo");
        }

        router.push(`/todos/${todo.id}`);
        router.refresh();
    }catch(err){
        setError(err.message || "An error occurred");
    }finally{
        setLoading(false);
    }
};

return(
    <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.errorAlert}>{error}</div>}

        <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>Title<span className={styles.required}>*</span></label>
            <input 
            type="text" 
            id="title"
            className={styles.input}
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
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
            rows={4}
            />
        </div>

        <div className={styles.formRow}>
            <div className={styles.formGroup}>
                <label htmlFor="priority" className={styles.label}>Priority</label>
                <select 
                id="priority"
                className={styles.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="dueDate" className={styles.label}>Due Date</label>
                <input 
                type="date"
                id="dueDate"
                className={styles.input}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="status" className={styles.label}>Status</label>
                <select
                id="status"
                className={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
)
}
