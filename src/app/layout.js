import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";

export const metadata = {
  title: "ManageMint",
  description: "Manage your brand swiftly",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className='min-h-screen min-w-screen font-satoshi bg-slate-100 transition dark:bg-slate-800 dark:text-white'>
        <ThemeProvider>
          <UserProvider>
            <Navbar />
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
