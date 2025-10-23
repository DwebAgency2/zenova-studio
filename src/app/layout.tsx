import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/component/ErrorReporter";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ZENOVA - Where Small Businesses Look Big Online",
  description: "Professional website templates and custom development services for small businesses and local service providers.",
  icons: {
    icon: "/Zenova-Studio-Logo_png.svg",
  },
};

export default function RootLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
          {/* ✅ Toast notification container (must be inside body) */}
        <Toaster position="top-right" reverseOrder={false} />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}