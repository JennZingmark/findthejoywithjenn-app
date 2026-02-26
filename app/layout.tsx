import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import BottomNav from "./components/BottomNav";

export const metadata: Metadata = {
  title: "Find the Joy with Jenn",
  description: "Get Your Daily Jenn Juice + connect with Jenn’s resources.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#ab882e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-black">
        <div className="flex min-h-screen flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-md items-center justify-center px-6 py-4">
              <img
                src="/logo.png"
                alt="Find the Joy with Jenn"
                className="h-20 w-auto"
              />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 pb-20">
            <PageTransition>{children}</PageTransition>
          </main>

          <BottomNav />
        </div>
      </body>
    </html>
  );
}