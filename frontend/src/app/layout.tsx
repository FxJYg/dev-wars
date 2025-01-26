"use client";

import "./globals.css";
import Link from "next/link";
import { MdOutlineMonitor } from "react-icons/md";
import { LuSwords } from "react-icons/lu";
import { LoginLogOut } from "@/components/login-logout";
import { IoLogInOutline } from "react-icons/io5";
import { TimerProvider, useTimerContext } from "@/context/TimerContext";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {

  const pathname = usePathname();
  console.log(pathname);

  return (
    <html lang="en" className="dark">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' />
      </head>
      <body>
        <div className="flex flex-col h-screen">
          <header>
            <nav className="border-b border-gray-700">
              <div className="flex p-3 space-x-4">
                <Link href="/">
                  <div className="flex space-x-2 items-center hover:scale-105 hover:origin-left">
                    <div className="relative flex items-center justify-center w-10 h-10">
                      <MdOutlineMonitor className="absolute w-full h-full text-xl text-[#7b9acc]"/>
                      <LuSwords className="absolute w-1/2 h-1/2 mb-1 text-sm text-[#FCF6F5]"/>
                    </div>
                    <div className="min-w-fit text-xl font-extrabold">
                      dev-wars
                    </div>
                  </div>
                </Link>
                <div className="flex space-x-6 w-full px-2 items-center justify-end text-lg font-bold">
                  <div className="group relative inline-block">
                    <Link href="/practice">
                      Practice
                    </Link>
                    <span
                      className={`absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#7b9acc] 
                        ${pathname.includes("/practice") ? `left-0 w-full` :`transition-all duration-300 group-hover:w-full group-hover:left-0`}`}
                    ></span>
                  </div>
                  <div className="group relative inline-block">
                    <Link href="/play">
                      Playground
                    </Link>
                    <span
                      className={`absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#7b9acc] 
                        ${pathname == "/play" ? `left-0 w-full` :`transition-all duration-300 group-hover:w-full group-hover:left-0`}`}
                    ></span>
                  </div>
                  <LoginLogOut />
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-grow">
            <TimerProvider>
              {children}
            </TimerProvider>
            {auth}
          </main>
        </div>
      </body>
    </html>
  );
}