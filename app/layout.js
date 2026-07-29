import './globals.css';

export const metadata = {
  title: 'MarketZone Enterprise Platform',
  description: 'Global B2B and B2C Marketplace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
