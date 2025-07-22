import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Alex Johnson - Creative Developer",
  description: "Full-stack developer specializing in modern web technologies with a passion for creating stunning digital experiences.",
  keywords: ["portfolio", "developer", "full-stack", "React", "Next.js", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} ${poppins.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
