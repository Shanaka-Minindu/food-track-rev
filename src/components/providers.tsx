"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./ui/sonner";
import AlertDialogProvider from "./ui/alertDialogProvider";
import { toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions:{
    mutations:{
      onError:(e)=>{
        if(e.message=== "NEXT_REDIRECT") return;
        toast.error(e.message)
      },
      onSuccess:()=>{
        toast.success("Operation was successful")
      }
    }
  }
});

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <NextThemesProvider {...props}>
        <AlertDialogProvider />
        <Toaster />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
