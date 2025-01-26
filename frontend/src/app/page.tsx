"use client";

import { useState, useEffect } from "react"; 
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdStart } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  const [currentCode, setCurrentCode] = useState("");

  const codeSnippet = 
`impport React, { useState } from "react";

export default function TodoList() {
  const tasks = ["Learn React", "Build a To-Do List", "Master JavaScript"];
  const [completed, setCompleted] = useState(new Array(tasks.length).fill(false));

  const toggleTask = (index) => {
    setCompleted((prev) =>
      prev.map((status, i) => (i === index ? !status : status))
    );
  };

  return (
    ...
  );
}`

    useEffect(() => {
      let isCancelled = false;
      let index = 0;
    
      const typeAnimation = () => {
        if (index < codeSnippet.length - 1 && !isCancelled) {
          setCurrentCode((prev) => prev + codeSnippet[index]);
          index++;
    
          requestAnimationFrame(() => setTimeout(typeAnimation, 50)); // Delay between characters
        }
      };
    
      typeAnimation();
    
      return () => {
        isCancelled = true;
      };
    }, [codeSnippet]);
    

  return (
    <>
      <div className="flex flex-col h-full pt-6 mb-2 gap-4">
        <div className="mx-auto justify-center items-center">
          <h1 className="text-bold text-center text-3xl font-mono">
            No more tutorials and walkthroughs.<br />Test your skills in real world challenges that matter.
          </h1>
        </div>
        <div className="mx-auto justify-center w-2/3 rounded-lg px-2 bg-[#090909] border-gray-900 border">
          <SyntaxHighlighter
            language="javascript"
            style={atomDark}
            customStyle={{
              height: "60vh"
            }}
          >
            {currentCode + (currentCode.length < codeSnippet.length - 1 ? "|" : "")}
          </SyntaxHighlighter>
        </div>
        <div className="relative w-1/5 h-1/10 mx-auto p-4 rounded-lg bg-[#7b9acc] font-mono hover:scale-105">
          <Link href="/login">
            <div className="flex space-x-4 justify-center items-center text-center font-extrabold">
              <h1>Get Started</h1>
              <MdStart />
            </div>
            <span
              className="absolute inset-0 border-2 border-transparent rounded-lg transition duration-500 
              hover:rounded-lg spin border-white"
            ></span>
          </Link>
        </div>
      </div>
      <footer>
        <div className="text-center p-4 border-t border-gray-700">
          &copy; {new Date().getFullYear()} Felix Yang and Joshua Zheng. All rights reserved.
        </div>
      </footer>
    </>
  );
}
