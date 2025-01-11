import { SessionProvider } from "next-auth/react";
import { Dashboard } from "./dashboard";
import { WebsiteRepository } from "@/server/repositorys/websiteRepository";

export default async function App() {
  

  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  );
}
