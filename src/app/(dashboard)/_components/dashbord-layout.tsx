"use client";
import React, { ReactNode, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu } from "lucide-react";
type DashbordLayoutProp = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashbordLayoutProp) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </Collapsible.Trigger>
      </Collapsible.Root>

      <Collapsible.Root className="fixed top-0 left-0 z-20 h-dvh" open={open} onOpenChange={setOpen}>
        <Collapsible.Content forceMount>
        <div className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open?"translate-x-0":"-translate-x-full"}`}>
          <div className="flex items-center justify-between ">
            <h1 className="font-semibold">Admin Dashboard</h1>
            <Collapsible.Trigger asChild >
              <Button size="icon" variant="outline">
                <ChevronLeft/>
              </Button>
            </Collapsible.Trigger>
          </div>
        </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <main className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open?"ml-64" : "ml-0"}`}>
      {children}
      </main>
      
    </div>
  );
};

export default DashboardLayout;
