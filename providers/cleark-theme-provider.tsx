"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark, neobrutalism } from "@clerk/themes";

// ...
export function ClerkThemeProviders({ children }: any) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export default ClerkThemeProviders;
