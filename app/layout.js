export const metadata = {
  title: 'MarketZone',
  description: 'Multi-vendor E-commerce Marketplace',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
