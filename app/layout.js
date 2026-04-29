import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "Animesh Poudel | Full Stack Frontend Developer",
  description: "Portfolio of Animesh Poudel, a Full Stack Frontend Developer.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="bg-[#050505] text-[#f5f5f5] overflow-x-hidden antialiased font-sans noise selection:bg-white selection:text-[#050505]">
        {children}
      </body>
    </html>
  );
}
