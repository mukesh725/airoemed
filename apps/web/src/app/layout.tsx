import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIRO eMed US — Healthcare for How You Live Today',
  description: 'Telehealth platform for hair loss, sexual wellness, weight loss, and dermatology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Zero 3rd party ad tracking pixels on health pages */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F9F6F0] text-[#1C1B1A] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
