"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./ui/sonner";

const queryClient = new QueryClient();

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <QueryClientProvider client={queryClient}> <NextThemesProvider {...props}><Toaster/>{children}</NextThemesProvider></QueryClientProvider>
}