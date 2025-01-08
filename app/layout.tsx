import type { Metadata } from "next";
import "./globals.css";
import '../public/main.scss';

export const metadata: Metadata = {
  title: "Valid Cars",
  description: "Your Favorite Cars Portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
