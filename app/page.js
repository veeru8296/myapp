import Link from "next/link"
import styles from "./page.module.css"
import { getTodoStats } from "@/lib/todos"

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Todo Management App",
  description: "Manage your todos",
}

export default async function Home(){
  const { total, completed, pending } = await getTodoStats();
  return (
    <main className={styles.container}>
      
      <section className={styles.hero}>
        <div className={styles.badge}> NEXTJs TODO's Management app</div>
        <h1 className={styles.title}>TODO <span className={styles.accent}>Management</span></h1>
        <p className={styles.description}>Organise your daily tasks and boost productivity</p>
      </section>

      <section className={styles.statsGrid} aria-label="Todo Stats">
        <div className={`${styles.statCard} ${styles.statTotal}`}>
          <span className={styles.statNumber}>{total}</span>
          <span className={styles.statLabel}>Total Todos</span>
        </div>

        <div className={`${styles.statCard} ${styles.statCompleted}`}>
          <span className={styles.statNumber}>{completed}</span>
          <span className={styles.statLabel}>Completed</span>
        </div>

        <div className={`${styles.statCard} ${styles.statPending}`}>
          <span className={styles.statNumber}>{pending}</span>
          <span className={styles.statLabel}>Pending</span>
        </div>
      </section>

      <div className={styles.ctaWrapper}>
        <Link href="/todos" className={styles.ctaButton} id="view-todos-btn">
          View All Todos
          <span className={styles.arrow}>→</span>
        </Link>
      </div>

    </main>

  )
}