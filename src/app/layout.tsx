import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { FooterSection } from "./_components/FooterSection";
import { Header } from "./_components/Header";
import { ToasterProvider } from "./_components/ToasterProvider";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Fadder",
  description: "Auto auction marketplace for buying and shipping vehicles.",
  openGraph: {
    title: "Fadder",
    description: "Auto auction marketplace for buying and shipping vehicles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Fadder",
        description:
          "Auto auction marketplace for buying and shipping vehicles.",
        email: "info@fadder.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Auto Avenue",
          addressLocality: "Miami",
          addressRegion: "FL",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        name: "Fadder",
        description:
          "Auto auction marketplace for buying and shipping vehicles.",
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: schema.org markup
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <AuthProvider>
          <ToasterProvider />
          <Header />
          {children}
          <FooterSection />
        </AuthProvider>
      </body>
    </html>
  );
}
