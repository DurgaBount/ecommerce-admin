import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const isSuperAdmin = process.env.SUPER_ADMIN == userId && true;

  console.log("isSuperAdmin", isSuperAdmin);
  console.log("useridddd", process.env.SUPER_ADMIN);
  console.log("userId", userId);

  if (isSuperAdmin) {
    const store = await prismadb.store.findFirst({
      where: {
        userId,
      },
    });
    if (store) {
      redirect(`/${store.id}`);
    }
  } else {
    const user = await prismadb.user.findFirst({
      where: {
        userId,
      },
    });
    if (user) {
      redirect(`/${user.storeId}`);
    }
  }

  return <>{children}</>;
}
