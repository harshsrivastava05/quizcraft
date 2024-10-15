// app/components/ClientProviders.tsx
"use client"; // Mark this as a client component

import { ThemeProvider } from "@/components/theme-provider"; // Assuming theme-provider needs to run on the client

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
