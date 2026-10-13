import type { Metadata } from "next";
import { listing } from "@/data/listing";
import "./globals.css";

export const metadata: Metadata = {
  title: `${listing.title} - Serviced apartments for Rent in ${listing.location} - Airbnb`,
  description: listing.description.slice(0, 155),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
