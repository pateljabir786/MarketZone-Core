export const metadata = {
  title: 'MarketZone',
  description: 'MarketZone Enterprise Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

