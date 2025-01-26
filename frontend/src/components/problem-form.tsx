"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "./ui/button";  
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTimerContext } from "@/context/TimerContext";

export function ProblemForm(){
    const [timerValue, setTimerValue] = useState(0);
    const router = useRouter();
    const { setSelectedInstruction, setSelectedSetting } = useTimerContext()

    const handleProblem = async () => {
        const dif = timerValue <= 15*60 ? "easy" : timerValue <= 30*60 ? "medium": "hard";

        const response = await fetch('http://localhost:3001/judge/generate',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({dif}),
        })
        const result = await response.json();
        let output = result.name + "\n";
        for(let i = 0; i < result.tasklist.length; i++){
            output += result.tasklist[i].tasknum +". " +result.tasklist[i].title+" with ID: #\"" + result.tasklist[i].elementID + "\"\n\t\t\t" + result.tasklist[i].description+"\n"; 
        }
        console.log(output);
        setSelectedInstruction(output);
        setSelectedSetting(timerValue);
        router.back()
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm border border-[#7b9acc]">
                <Card>
                    <CardHeader>
                        <div className="relative items-center text-2xl">
                            <CardTitle>Difficulty</CardTitle>
                        </div>
                        <CardDescription>
                            Choose the problem difficulty and time:
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <Select onValueChange={(s) => setTimerValue(parseInt(s))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">Easy (15 min)</SelectItem>
                                    <SelectItem value="30">Medium (30 min)</SelectItem>
                                    <SelectItem value="60">Hard (60 min)</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleProblem} type="submit" className="w-full">
                                Generate Problem
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}