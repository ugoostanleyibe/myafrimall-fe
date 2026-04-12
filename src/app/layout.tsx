import { type Metadata } from 'next';

import { DM_Sans, Montserrat } from 'next/font/google';

import { Providers } from '@/context/Providers';

import './globals.css';

type LayoutProps = React.HTMLAttributes<HTMLElement>;

const dmSans = DM_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MyAfriMall – Seamless Shipping from Nigeria to 300+ Countries',
  description:
    'Ship to over 300 countries from Nigeria with MyAfriMall. Fast delivery, easy customs processing, and real-time shipment tracking.'
};

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="font-dm-sans bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
