import './globals.css';

export const metadata = {
  title: 'MarketZone Enterprise',
  description: 'Global B2B and B2C Marketplace Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
