import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar"; // Ensure Sidebar is imported
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Ensure to include <head> for any head elements like meta tags, title, etc. */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div style={{ display: "flex" }}>
            <Sidebar /> {/* Render Sidebar here */}
            <div style={{ flex: 1 }}>
              <Navbar />
              {children} {/* Main content */}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
