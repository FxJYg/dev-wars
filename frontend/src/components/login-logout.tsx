"use client";

import Link from "next/link";
import { useState, useEffect} from "react";
import { IoLogInOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import  { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

export function LoginLogOut() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean|null>(null);
    const router = useRouter();
    
    const logOut = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try{
            fetch('http://localhost:3001/auths/logout', {
            method: 'POST',
            credentials: 'include', // Ensures cookies are sent with the request
            }
            ).then((res) => res.json()).then((data) => {
                console.log("Logout response:" + data);
                setIsLoggedIn(false);
            }).catch((err) => {
                console.log(err);
            });
        }catch(err){
            console.log(err);
        }
        router.push("/")
    }

    const getUsername = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/protected', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok){
                const data = await response.json()
                console.log(data);
                return data.user.name;
            } else {
                return "none";
            }
        } catch {
            console.error('Error fetching login')
            return "none";
        }
    }

    const checkLoginStatus = async ()=> {
        try {
            const response = await fetch('http://localhost:3001/auths/check', {
                method: 'GET',
                credentials: 'include', // Ensures cookies are sent with the request
            });
            
            if (!response.ok) {
                setIsLoggedIn(false);
                return false;
            }
        
            const data = await response.json();
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error checking login status:', error);
            setIsLoggedIn(false);
        }
    }
    useEffect(()=>{
        checkLoginStatus();
    },[]);
    return (
        <div>
        { isLoggedIn ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className="mt-2"><CgProfile className="w-6 h-6 hover:scale-110"/></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className="font-mono text-extrabold">{getUsername()}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button onClick={logOut}>
                                    Log Out
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
            ):(
                <Link href="/login">
                    <IoLogInOutline className="w-6 h-6 hover:scale-110"/>
                </Link>
            )}
        </div>
    )
};

