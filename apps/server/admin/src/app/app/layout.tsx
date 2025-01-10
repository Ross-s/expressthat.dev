import { signOut } from "../../server/auth";
import Image from "next/image";
import { ActionButton } from "../../components/client/ActionButton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function signout() {
    "use server";
    return await signOut({
      redirectTo: "/",
    });
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ExpressThat</a>
          <select
            defaultValue="Pick a workspace"
            className="select select-secondary w-50"
          >
            <option disabled>Default</option>
            <option>Zig</option>
            <option>Go</option>
            <option>Rust</option>
          </select>
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
