import Link from "next/link"
import styles from "./layout.module.css"

export default function TodosLayout({children}){
    return(
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>✓</span>
                        <span>TODO <span className={styles.logoAccent}>.</span></span>
                    </Link>

                    <nav className={styles.nav}>
                        <Link href="/" className={styles.navLink}>
                        Home
                        </Link>
                        <Link href="/todos" className={styles.navLink}>
                        All Todos</Link>
                    </nav>

                    <Link href="/todos/new" className={styles.newBtn}>
                    + New Todo
                    </Link>

                </div>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    )
}