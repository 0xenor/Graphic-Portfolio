import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/src/components/Navbar';
import PageLoader from '@/components/ui/PageLoader';
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Fahed Hadji | Graphic Designer",
  description: "Turning ideas into elegant digital experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} font-sans bg-black text-white antialiased overflow-x-hidden`}
      >
        <div className="fixed inset-0 -z-10 h-full w-full bg-black">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>

        <Navbar />
        <PageLoader>
          <main>{children}</main>
        </PageLoader>
      </body>
    </html>
  );
}