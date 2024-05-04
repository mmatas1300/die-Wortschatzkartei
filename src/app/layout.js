import { baloo } from '@/app/ui/fonts';
import "./globals.css";
import Providers from './Providers';
import Navbar from '@/components/nav/Navbar';

export const metadata = {
  title: "die Wortschatzkartei",
  description: "Web application designed to create your own flashcards and learn German vocabulary with spaced repetition",
};

export default function RootLayout({ children }) {

  return (
    <html lang="de">
      <body className={`${baloo.className}`}>
        <Providers>
          <Navbar />
          <main className="lg:pl-[250px] h-full mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}