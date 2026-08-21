
export default function NotFound(){
    return(
        <main
            className="not-found"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                textAlign: "center"
            }}
        >
            <h1>Todo Not Found</h1>
            <p>Unfortunately, the requested todo could not be found.</p>
        </main>
    )
}