// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Twin Space",
  description: "Dorm-first design platform — AI + XR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"suppressHydrationWarning>
      <body className="bg-[#edeae1] text-[#1f1f1f]" suppressHydrationWarning>
        {/* Render the page content */}
        {children}

        {/* Global Footer */}
        <footer className="border-t py-8 text-xs text-[#666]">
          <div className="mx-auto max-w-6xl px-6 flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-[#6f0500]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#6f0500]">
              Terms
            </Link>
            <a href="#contact" className="hover:text-[#6f0500]">
              Contact
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
} 
