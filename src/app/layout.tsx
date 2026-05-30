import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Md. Toufiqul Islam - Software Engineer | Node.js, Golang, Docker, Kubernetes",
  description:
    "Software engineer with 6 years of professional experience working in high volume and fast paced environments. Skilled in creating scalable and impactful products using variety of technologies including Node.js, Go and Kubernetes & PostgresSQL",
  keywords: [
    "Backend Engineer",
    "Backend Developer",
    "Node.js",
    "Golang",
    "TypeScript",
    "JavaScript",
    "Docker",
    "Kubernetes",
    "Web Developer",
    "Mobile Developer",
    "Dhaka Bangladesh",
    "Software Engineer",
  ],
  authors: [{ name: "Md. Toufiqul Islam" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://toufiq.me" },
  openGraph: {
    type: "website",
    url: "https://toufiq.me",
    title: "Md. Toufiqul Islam - Software Engineer | Node.js, Golang, Docker, Kubernetes",
    description:
      "Software engineer with 6 years of professional experience working in high volume and fast paced environments. Skilled in creating scalable and impactful products using variety of technologies including Node.js, Go and Kubernetes & PostgresSQL",
    images: [{ url: "https://toufiq.me/og-image.jpg" }],
    siteName: "Toufiqul Islam Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Toufiqul Islam - Software Engineer",
    description:
      "Software engineer with 6 years of professional experience working in high volume and fast paced environments",
    images: ["https://toufiq.me/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md. Toufiqul Islam",
  jobTitle: "Software Engineer",
  description:
    "Software engineer with 6 years of professional experience working in high volume and fast paced environments",
  url: "https://toufiq.me",
  sameAs: [
    "https://www.linkedin.com/in/toufiqcse36/",
    "https://github.com/toufiq-austcse",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "Bangladesh",
  },
  email: "toufiq.austcse@gmail.com",
  knowsAbout: [
    "Node.js",
    "Go(Golang)",
    "TypeScript",
    "NestJS",
    "JavaScript",
    "Backend Development",
    "Docker",
    "Kubernetes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>"
        />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} font-sans antialiased`}>
        <Navbar />
        <div className="h-20"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}