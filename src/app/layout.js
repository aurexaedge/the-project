import './globals.css';
import Provider from '@/components/Providers/Provider';
import NextTopLoader from 'nextjs-toploader';
import ConditionalNavbar from '@/components/Navigations/Navbar/ConditionalNavbar';
import {
  Roboto,
  Montserrat,
  Poppins,
  Rubik,
  Open_Sans,
} from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});
const montserrat = Montserrat({
  weight: ['300', '400', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

const openSans = Open_Sans({
  weight: ['300', '400', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-openSans',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  subsets: ['latin'],
  display: 'swap',
});

const rubik = Rubik({
  weight: ['300', '400', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-rubik',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.aurexaedge.com'),
  title: 'Online Bank | Bank Accounts & Home Loans - Aurexa Edge',
  description:
    'Simplify your finances with Aurexa Edge — secure online banking, easy account setup, and flexible home loan options.',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    images: '/opengraph.png',
    title: 'Online Bank | Bank Accounts & Home Loans - Aurexa Edge',
    description:
      'Simplify your finances with Aurexa Edge — secure online banking, easy account setup, and flexible home loan options.',
    url: '/',
    siteName: 'aurexaedge.com',
    images: [
      {
        url: '/opengraph.png', // Must be an absolute URL
      },
      {
        url: '/opengraph.png', // Must be an absolute URL
        alt: 'graphImageAlt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Bank | Bank Accounts & Home Loans - Aurexa Edge',
    description:
      'Simplify your finances with Aurexa Edge — secure online banking, easy account setup, and flexible home loan options.',
    images: {
      url: '/opengraph.png',
      alt: 'aurexaedge Logo',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.variable} ${roboto.variable} ${openSans.variable} ${poppins.variable}  ${rubik.variable}`}
      >
        <NextTopLoader />
        <Provider>
          <ConditionalNavbar>{children}</ConditionalNavbar>
        </Provider>
      </body>
    </html>
  );
}
