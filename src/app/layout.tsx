import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { AppInsightsInit } from "@/components/atoms/AppInsightsInit";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Círculo Vivo",
  description: "Plataforma de visualización de sistemas alimentarios en México",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <AppInsightsInit />
        {children}
      </body>
    </html>
  );
}
