"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/apolloClient";
import { Navbar } from "@/components/NavBar/Navbar";
import "@/app/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
