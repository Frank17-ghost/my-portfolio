import { useState, useEffect } from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const controller = new AbortController();

        async function getUsers() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error("Could not load users");
                const data = await response.json();
                if (!Array.isArray(data)) throw new Error("Unexpected users response");
                if (controller.signal.aborted) return;
                setUsers(data);
                setStatus("ready");
            } catch {
                if (!controller.signal.aborted) setStatus("error");
            }
        }

        getUsers();
        return () => controller.abort();
    }, []);

    const message = status === "loading" ? "Loading users…"
        : status === "error" ? "Couldn’t load users. Refresh the page to try again."
        : users.length === 0 ? "No users found."
        : null;

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
            <h1 className="mb-4 font-serif text-3xl font-semibold">User directory</h1>
            {message && <p className="mb-4" role={status === "error" ? "alert" : "status"}>{message}</p>}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3" scope="col">Name</th>
                            <th className="p-3" scope="col">Username</th>
                            <th className="p-3" scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.username}</td>
                                <td className="p-3">{item.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default App;
