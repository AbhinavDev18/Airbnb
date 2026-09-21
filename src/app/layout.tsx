import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { listing } from "@/data/listing";
import "./globals.css";

/**
 * Stands in for Airbnb Cereal, which is proprietary. next/font self-hosts the
 * files at build time, so there is no request to Google at runtime.
 */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${listing.title} - Serviced apartments for Rent in ${listing.location} - Airbnb`,
  description: listing.description.slice(0, 155),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only-focusable absolute left-4 top-4 z-[100] rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
