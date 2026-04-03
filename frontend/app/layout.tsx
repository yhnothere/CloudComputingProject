import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Amplify from "@/components/Amplify";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bean What The",
  description: "Specialty single-origin coffee beans",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Amplify>{children}</Amplify>
      </body>
    </html>
  );
}