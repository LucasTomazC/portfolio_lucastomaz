import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { AnimationProvider } from "@/context/AnimationContext";
import { FluidCursor } from "@/components/FluidCursor";
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
    "Web Developer Portfolio",
  ],
  authors: [{ name: "João Lucas" }],
  creator: "João Lucas",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://lucastomaz.dev",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lucastomaz.dev",
    title: "João Lucas | Modern Web Developer Portfolio",
    description:
      "Portfólio interativo de desenvolvimento web com animações cinematográficas imersivas e experiência de alto impacto.",
    siteName: "João Lucas Portfolio",
    // TODO: Add og:image when ready
    // images: [{ url: "https://lucastomaz.dev/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "João Lucas | Modern Web Developer Portfolio",
    description:
      "Portfólio interativo de desenvolvimento web com animações cinematográficas imersivas e experiência de alto impacto.",
    // TODO: Add twitter:image when ready
    // images: ["https://lucastomaz.dev/og-image.png"],
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
        <a href="#home" className="skip-to-content">
          Pular para o conteúdo
        </a>
        <AnimationProvider>
          <FluidCursor />
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
