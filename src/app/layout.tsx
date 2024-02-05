import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://tarekhammami.me'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  title: { default: 'Tarek Hammami — Software Developer, Technical Writer and OSS Contributor', template: '%s | Tarek Hammami' },
  description: 'Software Developer',
  openGraph: {
    title: 'Tarek Hammami',
    description: 'Software Developer',
    url: 'https://tarekhammami.me',
    siteName: 'Tarek Hammami',
    locale: 'en_US',
    type: 'website',
    images: '/og-image.png',
  },
  twitter: {
    title: 'Tarek Hammami',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="1a42d811-ba88-43b2-82bd-8fa38c568a81"
          async
        ></script>
      </head>
      <body
        className={`bg-primary text-secondary text-sm md:text-base ${inter.className}`}
      >
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-12 items-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
