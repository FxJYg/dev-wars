import "./globals.css";
import Link from "next/link";
import { MdOutlineMonitor } from "react-icons/md";
import { LuSwords } from "react-icons/lu";
import { IoLogInOutline } from "react-icons/io5";

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' />
      </head>
      <body>
        <div className="flex flex-col h-screen">
          <header>
            <nav className="border-b border-gray-700">
              <div className="flex p-4 space-x-4">
                <div className="flex w-1/4 space-x-2 items-center hover:scale-105 hover:origin-left">
                  <div className="relative flex items-center justify-center w-8 h-8">
                    <MdOutlineMonitor className="absolute w-full h-full text-xl text-[#7b9acc]"/>
                    <LuSwords className="absolute w-1/2 h-1/2 mb-1 text-sm text-[#FCF6F5]"/>
                  </div>
                  <div className="text-xl font-extrabold">
                    <Link href="/">
                      dev-wars
                    </Link>
                  </div>
                </div>
                <div className="flex space-x-6 w-full px-2 items-center justify-end text-lg font-bold">
                  <div className="group relative inline-block">
                    <Link href="/play">
                      play
                    </Link>
                    <span
                      className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#7b9acc] transition-all duration-300 group-hover:w-full group-hover:left-0"
                    ></span>
                  </div>
                  <div className="group relative inline-block">
                    <Link href="/practice">
                      practice
                    </Link>
                    <span
                      className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#7b9acc] transition-all duration-300 group-hover:w-full group-hover:left-0"
                    ></span>
                  </div>
                  <Link href="/login">
                    <IoLogInOutline className="w-6 h-6 hover:scale-110"/>
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-grow">
            {children}
            {auth}
          </main>
          <footer>
            <div className="text-center p-6 border-t border-gray-700">
              &copy; {new Date().getFullYear()} Felix Yang and Joshua Zheng. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
