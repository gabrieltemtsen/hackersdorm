import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { HackersDormProvider } from "@/context/HackersDormContext";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementsBanner } from "@/components/layout/AnnouncementsBanner";

export const metadata: Metadata = {
  title: "HackersDorm — The Operating System for Modern Hackathons",
  description:
    "The premier platform for developer hackathons, engineering summits, and technical talent discovery. Host competitions with custom bounty tracks, frictionless submissions, and weighted rubric judging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "#D9822B",
          colorPrimaryForeground: "#0A0B0E",
          colorBackground: "#12141A",
          colorForeground: "#F3F4F6",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className="min-h-screen flex flex-col bg-dark-950 text-dark-100 font-sans selection:bg-primary selection:text-dark-950 antialiased">
          <ConvexClientProvider>
            <HackersDormProvider>
              <AnnouncementsBanner />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </HackersDormProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
