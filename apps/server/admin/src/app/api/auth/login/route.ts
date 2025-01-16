import { signIn } from "@/server/auth";

export async function GET() {
  return await signIn("cognito");
}
