import { prisma } from "@/lib/db";
import React, { ReactNode } from "react";
import DashboardLayout from "./_components/dashbord-layout";

type layoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: layoutProps) => {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default Layout;
