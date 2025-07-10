// import "@/services/mockAdapter";
import { Navbar } from "@/components/Navbar";
import "@/styles/fonts.css";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="flex justify-start">
          <Navbar />

          {children}
        </div>
      </body>
    </html>
  );
}
