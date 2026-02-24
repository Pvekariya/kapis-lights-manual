import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
</head>
      <body>

        {children}

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919953084555"
          target="_blank"
          className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          WhatsApp
        </a>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KD11L4TJYQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KD11L4TJYQ');
          `}
        </Script>

      </body>
    </html>
  );
}