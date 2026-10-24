import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoFont = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--custom-roboto-font",
});

export const metadata: Metadata = {
  title: "NoteHub - Note Taking App",
  description:
    "Manage and organize your personal notes effortlessly with NoteHub.",
  openGraph: {
    title: "NoteHub - Note Taking App",
    description:
      "Manage and organize your personal notes effortlessly with NoteHub.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub cover image",
      },
    ],
  },
};

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <TanStackProvider>
        <body className={robotoFont.variable}>
          <Header />
          {children}
          {modal}
          <Footer />
        </body>
      </TanStackProvider>
    </html>
  );
}
