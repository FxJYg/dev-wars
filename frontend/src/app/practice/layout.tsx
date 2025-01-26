"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { time } from "console";

export default function PracticeLayout({
    children,
    menu,
  }: Readonly<{
    children: React.ReactNode;
    menu: React.ReactNode;
  }>) {
    const [timeLeft, setTimeLeft] = useState<number>(() => {
        const savedTimer = localStorage.getItem("timer");
        return savedTimer ? parseInt(savedTimer) : 0;
    });
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

    useEffect(() => {
        if (!timeLeft) return;
        const interval = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000)
        return () => clearInterval(interval);
    }, [timeLeft]);

    return (
        <div className="flex h-full w-full">
            {children}
            {menu}
            <div className="fixed p-4 bottom-2 right-2 rounded-lg font-mono bg-white border-[#7b9acc] border-2 text-black">
                {`${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`}
            </div>
        </div>
    );
}