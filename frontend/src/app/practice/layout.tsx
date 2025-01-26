"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function PracticeLayout({
    children,
    menu,
  }: Readonly<{
    children: React.ReactNode;
    menu: React.ReactNode;
  }>) {
    const router = useRouter()
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await fetch('http://localhost:3001/auths/check', {
                    method: 'GET',
                    credentials: 'include', 
                });
                
                if (!response.ok){
                    router.push('/')
                    setTimeout(() => {
                        router.push('/login')
                    }, 100)
                } else {
                    router.push('/practice/choose-difficulty')
                }
                const data = await response.json();
            } catch (error) {
                router.push('/')
                setTimeout(() => {
                    router.push('/login')
                }, 100)
            }
        }
        checkLogin();
    }, [router])
    console.log("Modal: ", menu)
    return (
        <div className="flex flex-col gap-2 h-full w-full">
            {children}
            {menu}
        </div>
    );
}