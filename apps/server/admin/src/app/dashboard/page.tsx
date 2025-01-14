import { SessionProvider } from "next-auth/react";
import { Dashboard } from "./dashboard";
import { WebsiteRepository } from "@/server/repositorys/websiteRepository";
import { auth, signIn } from "@/server/auth";
import { redirect } from "next/navigation";
import { UserRepository } from "@/server/repositorys/UserRepository";
import { revalidatePath } from "next/cache";
import { OnboardStage } from "../actions/user/onBoardingState";

export default async function App() {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/login")
  }

  const user = await UserRepository.findById(session.user.id);


  async function refreshData() {
    "use server";
    revalidatePath("/dashboard");
  }


  return (
    <SessionProvider>
      <Dashboard onboardingState={user?.onboardingState as OnboardStage} refreshData={refreshData} />
    </SessionProvider>
  );
}
