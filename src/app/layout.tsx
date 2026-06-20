import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { AnimationProvider } from "@/context/AnimationContext";
import { CursorAuroraTrail } from "@/components/CursorAuroraTrail";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "João Lucas | Modern Web Developer Portfolio",
  description:
    "Portfólio de João Lucas, Desenvolvedor Web especializado em criar soluções digitais completas de ponta a ponta (Next.js, TypeScript, Node.js, PostgreSQL).",
  keywords: [
    "João Lucas",
    "Desenvolvedor Web",
    "Full-Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Portfólio",
    "GTA VI Style Portfolio",
  ],
  authors: [{ name: "João Lucas" }],
  creator: "João Lucas",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lucastomaz.dev",
    title: "João Lucas | Modern Web Developer Portfolio",
    description:
      "Portfólio interativo de desenvolvimento web completo com animações cinematográficas de alto impacto inspiradas em GTA VI.",
    siteName: "João Lucas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Lucas | Modern Web Developer Portfolio",
    description:
      "Portfólio interativo de desenvolvimento web completo com animações cinematográficas de alto impacto inspiradas em GTA VI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#050505] text-white flex flex-col font-sans selection:bg-[#5DADE2] selection:text-black">
        <AnimationProvider>
          <CursorAuroraTrail />
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
