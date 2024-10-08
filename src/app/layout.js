import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ManageMint",
  description: "Manage your brand swiftly",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className='min-h-screen min-w-screen font-satoshi bg-slate-100 transition dark:bg-slate-800 dark:text-white'>
      <Toaster position="bottom-center" />
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
