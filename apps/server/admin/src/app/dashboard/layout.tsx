import { auth, signIn, signOut } from "@/server/auth";
import Image from "next/image";
import { ActionButton } from "@/components/client/ActionButton";
import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Websites | ExpressThat",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function signout() {
    "use server";
    return redirect(
      `https://auth.expressthat.dev/logout?client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.AUTH_URL}/logout`
    );
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1 flex">
          <div className="flex items-center">
            <Link href={"/"} className="btn btn-ghost text-xl">
              ExpressThat
            </Link>
            <h1 className="ml-4">Websites</h1>
          </div>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src="/account-svgrepo-com.svg"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Settings</a>
              </li>
              <li>
                <ActionButton action={signout}>Logout</ActionButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
