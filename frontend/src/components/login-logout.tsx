"use client";

import Link from "next/link";
import { useState, useEffect} from "react";
import { IoLogInOutline } from "react-icons/io5";

export function LoginLogOut() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean|null>(null);
    
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
    }

    const checkLoginStatus = async ()=> {
        try {
        const response = await fetch('http://localhost:3001/auths/check', {
            method: 'GET',
            credentials: 'include', // Ensures cookies are sent with the request
        });
        
        if (!response.ok) {
            console.log('Not logged in');
            setIsLoggedIn(false);
            return false;
        }
    
        const data = await response.json();
        console.log('Logged in:', data);
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
                <Link href="/" onClick={logOut}>
                    <IoLogInOutline className="w-6 h-6 hover:scale-110"/>
                </Link>
            ):(
                <Link href="/login">
                    <IoLogInOutline className="w-6 h-6 hover:scale-110"/>
                </Link>
            )}
        </div>
    )
};

