import './globals.css';

export const metadata = {
  title: 'Connection Toolkit',
  description: 'Intentional questions for deeper relationships',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
