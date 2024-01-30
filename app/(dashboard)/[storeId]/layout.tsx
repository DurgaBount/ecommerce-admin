import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const isSuperAdmin = process.env.SUPER_ADMIN == userId && true;

  if (isSuperAdmin) {
    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!store) {
      redirect("/");
    }
  } else {
    const user = await prismadb.user.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      redirect("/");
    }
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
