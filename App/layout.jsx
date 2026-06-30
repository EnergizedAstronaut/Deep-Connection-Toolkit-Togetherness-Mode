import './globals.css';

export const metadata = {
  title: 'Deep Connection Toolkit',
  description: 'Discover how deeply you connect with someone special',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
