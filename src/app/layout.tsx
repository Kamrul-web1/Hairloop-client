import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { Navbar } from "@/components/site/navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireLoop — The Modern Job Hunting Portal",
  description:
    "HireLoop bridges the gap between job seekers and employers — smart job search, company profiles, and a recruiter toolkit, all in one platform.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
