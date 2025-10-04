"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { Toaster } from "./ui/sonner";
import AlertDialogProvider from "./alertDialogProvider";




const queryClient = new QueryClient();




export function Providers({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <QueryClientProvider client={queryClient}>
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster/>
      <AlertDialogProvider />
      {children}
    </NextThemesProvider>
    </QueryClientProvider>
  );
}
