import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harley-Davidson | Engineered Not Designed",
  description: "Experience raw mechanical power. 1250cc of uncompromising engineering.",
  keywords: ["Harley-Davidson", "motorcycle", "V-Twin", "engineering", "premium"],
  authors: [{ name: "HD Engineering" }],
  openGraph: {
    title: "Harley-Davidson | Engineered Not Designed",
    description: "Experience raw mechanical power. 1250cc of uncompromising engineering.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} antialiased bg-harley-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
