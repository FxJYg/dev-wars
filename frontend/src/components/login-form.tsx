"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link";
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
import { useEffect, useRef } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const email = emailRef.current ? emailRef.current.value : '';
    const password = passwordRef.current ? passwordRef.current.value : '';

    const userData = { email, password };
    try{
      // const response = await fetch('http://localhost:5000/auths/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(userData),
      // });

      // if(!response.ok){
      //   console.log(response);
      //   throw new Error('Falied to login user');
      // }
      // const data = await response.json();
      // console.log(data);
      window.location.href = '/';
    } catch(err){
      console.log(err);
    }
  }
  
  return (
    <div className={cn("flex flex-col gap-6 rounded-md border border-[#7b9acc]", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex relative items-center text-2xl">
            <CardTitle>Login</CardTitle>
            <button onClick={() =>  {router.back()}} className="absolute right-0 top-0">
              <IoIosCloseCircleOutline className="w-5 h-5"/>
            </button>
          </div>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
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
                <Input id="password" type="password" ref={passwordRef} required />
              </div>
              <Button onClick={handleSubmit} type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
