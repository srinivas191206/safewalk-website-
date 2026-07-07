import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SafeWalk | Every Second Matters",
  description: "SafeWalk is an AI-powered proactive personal safety platform that automatically detects emergencies, alerts trusted contacts, and works offline.",
  keywords: ["personal safety", "SOS app", "emergency detection", "fall detection", "guardian mode", "offline SOS", "voice trigger SOS", "GPS tracking"],
  authors: [{ name: "Team SafeWalk" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "SafeWalk | Every Second Matters",
    description: "AI-powered personal safety platform that automatically detects emergencies, alerts trusted contacts, and works even without internet connectivity.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">{children}</body>
    </html>
  );
}
