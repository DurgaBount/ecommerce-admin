import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  const isSuperAdmin = process.env.SUPER_ADMIN == userId && true;

  if (!userId) {
    redirect("/sign-in");
  }

  let stores;

  if (isSuperAdmin) {
    stores = await prismadb.store.findMany({
      where: {
        userId,
      },
    });
  } else {
    stores = await prismadb.user.findMany({
      where: {
        userId,
      },
    });
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} isSuperAdmin={isSuperAdmin} />

        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
