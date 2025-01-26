"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const name = usernameRef.current ?  usernameRef.current.value : '';
    const email = emailRef.current ? emailRef.current.value : '';
    const password = passwordRef.current ? passwordRef.current.value : '';
    const password2 = confirmPasswordRef.current ? confirmPasswordRef.current.value : '';

    const userData = { name, email, password, password2 };
    try{
      const response = await fetch('http://localhost:3001/auths/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      if(!response.ok){
        console.log(response);
        throw new Error('Falied to register user');
      }
      const data = await response.json();
      console.log(data);
      router.back();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 rounded-md border border-[#7b9acc]", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex relative items-center text-2xl">
            <CardTitle>Signup</CardTitle>
            <button onClick={() =>  {router.back()}} className="absolute right-0 top-0">
              <IoIosCloseCircleOutline className="w-6 h-6"/>
            </button>
          </div>
          <CardDescription>
            Enter your username below to sign up for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="johndoe"
                  ref={usernameRef}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  ref={passwordRef}
                  required 
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  ref={confirmPasswordRef} 
                  required 
                />
              </div>
              <Button onClick={handleSubmit} type="submit" className="w-full">
                Signup
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
