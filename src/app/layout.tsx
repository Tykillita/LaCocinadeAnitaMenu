import './globals.css';
import React from 'react';
import { Analytics } from "@vercel/analytics/next";

/**
 * Metadata for the root layout.
 * This includes SEO information like the title and description for the application.
 */
export const metadata = {
  title: 'La Cocina de Anita',
  description: 'Menu App',
};

/**
 * The root layout component for the application.
 * It wraps all pages and provides the basic HTML structure.
 * @param {Readonly<{ children: React.ReactNode }>} props - The props for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered root layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}