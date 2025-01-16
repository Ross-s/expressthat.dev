import { signOut } from "@/server/auth";

export async function GET() {
  return await signOut({
    redirectTo: "/",
  });
}
