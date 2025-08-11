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
  title: "PDF Document Summarizer - Fast AI Summary Tool",
  description: "An AI-powered tool to quickly and easily summarize PDF documents. Get the key points from any PDF file in seconds.",
  keywords: ["pdf summarizer", "document summary", "ai summary", "pdf tool", "online summarizer", "fast summary", "ai document processing"],
  openGraph: {
    title: "PDF Document Summarizer",
    description: "Quickly upload and summarize your PDF documents with our AI-powered tool.",
    url: "hhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdocument&psig=AOvVaw2CWiIxa-20q-581PabHR1B&ust=1754885379097000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLivitmv_44DFQAAAAAdAAAAABAE",
    siteName: "PDF Document Summarizer",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PDF Document Summarizer AI Tool",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
