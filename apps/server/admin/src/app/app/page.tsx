import { SessionProvider } from "next-auth/react";
import { Dashboard } from "./dashboard";

export default function App() {
    return <SessionProvider>
        <Dashboard />
    </SessionProvider>
}