import React, { ReactNode } from "react";
import DashboardLayout from "./_components/dashbord-layout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type layoutProps = {
  children: ReactNode;
};
const Layout =async ({ children }: layoutProps) => {
  const session = await auth();
  if(!session) redirect("/sign-in")
  return (
    <>
      <DashboardLayout session={session} >{children}</DashboardLayout>
    </>
  );
};

export default Layout;
