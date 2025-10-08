import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIST - Profesyonel İçerik Stüdyosu ve Terapi",
  description: "PIST, müzik prodüksiyonu, podcast kayıtları, terapi hizmetleri ve yaratıcı atölyeler sunan profesyonel bir içerik stüdyosudur. Modern ekipmanlar ve uzman kadromuzla hizmetinizdeyiz.",
  keywords: ["müzik prodüksiyonu", "podcast", "terapi", "stüdyo", "ses kayıt", "yaratıcı atölyeler", "PIST"],
  authors: [{ name: "PIST Team" }],
  creator: "PIST",
  publisher: "PIST",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pist-website.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "PIST - Profesyonel İçerik Stüdyosu ve Terapi",
    description: "Müzik prodüksiyonu, podcast kayıtları, terapi hizmetleri ve yaratıcı atölyeler sunan profesyonel stüdyo.",
    url: 'https://pist-website.vercel.app',
    siteName: 'PIST',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PIST - Profesyonel İçerik Stüdyosu ve Terapi",
    description: "Müzik prodüksiyonu, podcast kayıtları, terapi hizmetleri ve yaratıcı atölyeler sunan profesyonel stüdyo.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
