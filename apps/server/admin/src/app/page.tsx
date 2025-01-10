import Link from "next/link";
import { ActionButton } from "../components/client/ActionButton";
import { auth, signIn, signOut } from "../server/auth";


async function signout() {
  "use server";
  return await signOut();
}

async function signin() {
  "use server";
  return await signIn("cognito");
}


export default async function Home() {


  const session = await auth();
  console.log(session?.user);


  return (
    <div>
      <main>
       {session && <ActionButton action={signout}><button>Sign Out</button></ActionButton>}
       {!session && <ActionButton action={signin}><button>Sign In</button></ActionButton>}
       <br />
       {session && <Link href="/app">App</Link>}
      </main>
    </div>
  );
}
