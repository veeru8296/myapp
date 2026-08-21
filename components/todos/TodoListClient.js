"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/app/todos/page.module.css";
import DeleteButton from "@/components/todos/DeleteButton";

function getPriorityClass(priority) {
    switch (priority?.toLowerCase()) {
        case "high": return styles.priorityHigh;
        case "medium": return styles.priorityMedium;
        case "low": return styles.priorityLow;
        default: return styles.priorityLow;
    }
}
function getStatusClass(status) {
    switch (status?.toLowerCase()) {
        case "completed": 
        case "complete": 
            return styles.statusCompleted;
        case "in-progress": 
            return styles.statusInProgress;
        case "pending": 
        default: 
            return styles.statusPending;
    }
}
function formatDate(dateStr) {
    if (!dateStr) return "No due date";
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

export default function TodoListClient({initialTodos}){
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const filteredTodos = initialTodos.filter((todo) => {
        const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || (todo.description || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || todo.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesPriority = priorityFilter === "all" || todo.priority.toLowerCase() === priorityFilter.toLowerCase(); 
        return matchesSearch && matchesStatus && matchesPriority
    });

    return(
        <main className={styles.container}>
            {/* <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>All Todos</h1>
                    <p className={styles.subtitle}>
                        {initialTodos.length} task{initialTodos.length === 1 ? "" : "s"} total
                        {filteredTodos.length !== initialTodos.length && `(${filteredTodos.length} shown)`}
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/" className={styles.backLink}>Home</Link>
                    <Link href="/todos/new" className={styles.newBtn} id="new-todo-btn">+ New Todo</Link>
                </div>
            </div> */}

            <div className={styles.header}>
                <h1 className={styles.title}>All Todos</h1>
                <p className={styles.subtitle}>
                    {initialTodos.length} task{initialTodos.length === 1 ? "" : "s"} total
                    {filteredTodos.length !== initialTodos.length && `(${filteredTodos.length} shown)`}
                </p>
            </div>

            <div className={styles.filterBar}>
                <div className={styles.searchInputWrapper}>
                    <svg
                        className={styles.searchIcon}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input 
                    type="text"
                    placeholder="Search todos by title or description..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="statusFilter" className={styles.filterLabel}>Status</label>
                
                    <select
                        id="statusFilter"
                        className={styles.filterSelect}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="priorityFilter" className={styles.filterLabel}>Priority</label>

                    <select
                        id="priorityFilter"
                        className={styles.filterSelect}
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                    </select>
                </div>

            </div> 

            {initialTodos.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No todos yet. Create your first Todo!</p>
                    <Link href="/todos/new" className={styles.newBtn}>
                    + New Todo</Link>
                </div>
            ): filteredTodos.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No such todos found matching your search.</p>
                    <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setPriorityFilter("all");
                    }}
                    >Clear all filters</button>
                </div>
            ):(
                // navigating through the filteredTodos to display the list of todos
                <ul className={styles.list} role="list">
                    {filteredTodos.map((todo) => (
                        <li key={todo.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>{todo.title}</h2>
                                <span className={`${styles.priorityBadge} ${getPriorityClass(todo.priority)}`}>
                                    {todo.priority}
                                </span>
                            </div>

                            <p className={styles.cardDescription}>{todo.description}</p>

                            <div className={styles.cardMeta}>
                                <span className={styles.dueDate}>Due: {formatDate(todo.dueDate)}</span>
                                <span className={`${styles.statusPill} ${getStatusClass(todo.status)}`}>
                                    {todo.status.charAt(0).toUpperCase()+todo.status.slice(1)}
                                </span>
                            </div>

                            <div className={styles.cardActions}>
                                <Link
                                href={`/todos/${todo.id}`}
                                className={`${styles.btn} ${styles.btnView}`}
                                id={`view-todo-${todo.id}`}
                                >
                                    View
                                </Link>

                                <Link
                                href={`/todos/${todo.id}/edit`}
                                className={`${styles.btn} ${styles.btnEdit}`}
                                id={`edit-todo-${todo.id}`}>
                                    Edit
                                </Link>

                                <DeleteButton 
                                   id={todo.id}
                                   todoTitle={todo.title}
                                   className={`${styles.btn} ${styles.btnDelete}`}
                                   label="Delete"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}
