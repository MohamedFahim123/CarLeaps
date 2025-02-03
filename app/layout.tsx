import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "../public/main.scss";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarLeaps",
  description: "Your Favorite Cars Portal.",
  icons: {
    icon: "/images/ValidCars.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-right" />
        {children}
      </body>
    </html>
  );
}
