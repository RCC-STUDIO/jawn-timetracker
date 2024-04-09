import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import ManagerLink from "@/components/ManagerLink";
import AuthProvider from "./pages/api/auth/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-blue-700">
      <body className="">
        <AuthProvider>
          <div className="bg-blue-700">
            <ManagerLink />
            {children}
            <NavBar />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
