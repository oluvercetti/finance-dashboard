import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AuthContextProvider } from "@/providers/AuthContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser().catch((error) => {
    redirect("/sign-in")
  })
  if (!loggedIn) redirect("/sign-in");

  return (
    <AuthContextProvider>
      <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn} />
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" alt="menu icon" width={30} height={30} />
            <div>
              <MobileNav user={loggedIn} />
            </div>
          </div>
          {children}
        </div>
      </main>
    </AuthContextProvider>
  );
}
