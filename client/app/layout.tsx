import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { Providers } from "./contexts/SessionProvider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/User";
import NextTopLoader from 'nextjs-toploader';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={``}
      >
        <Providers>
          <UserProvider>
            <ToastContainer />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader color="#f55bce" />
              {children}
            </ThemeProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
