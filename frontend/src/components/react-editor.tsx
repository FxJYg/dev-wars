"use client";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import Editor, { DiffEditor, useMonaco, loader, type OnMount } from '@monaco-editor/react';
import { useRef } from "react"
import * as Babel from "@babel/standalone";
import { FaPlay } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

type IStandaloneCodeEditor = Parameters<OnMount>[0];

export function ReactEditor({ submit=true }){
    const editorRef = useRef<IStandaloneCodeEditor>(null);
    const iframeContainerRef = useRef<HTMLDivElement>(null);
    const defaultCode = `const App = () => {
    return (
        <div>
            Hello World!

        </div>
    );
};
render(<App />);`

    function handleEditorDidMount(editor : any) {
        editorRef.current = editor;
      }
    
    function handleRunCode() {
        if (iframeContainerRef.current && editorRef.current){
            iframeContainerRef.current.innerHTML = ''; // Clear existing iframe
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframeContainerRef.current.appendChild(iframe);

            try {
                let code = editorRef.current.getValue()
                const transformedCode = Babel.transform(code , {
                    presets: ["react", "env"], 
                }).code;
                const script = `
                    const render = (component) => {
                        const rootElement = document.getElementById('root');
                        if (!rootElement) {
                            console.error('No root element found for rendering');
                            return;
                        }
                        const root = ReactDOM.createRoot(rootElement);
                        root.render(component);
                    };
                    ${transformedCode}
                `;
                const iframeDoc = iframe.contentDocument;
                if (iframeDoc) {
                    iframeDoc.open();
                    iframeDoc.write(`
                      <!DOCTYPE html>
                      <html lang="en">
                        <head>
                            <meta charset="UTF-8" />
                            <title>React Playground</title>
                            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                        </head>
                        <body>
                            <div id="root">
                                <script>${script}<\/script>
                            </div>
                        </body>
                      </html>
                    `);
                    iframeDoc.close();
                }
            } catch (error){
                console.error("Error transpiling or executing code:", error);
            }
        }
    }

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg border"
        >
            <ResizablePanel defaultSize={50}>
                <div className="flex flex-col h-full items-center justify-center gap-2 p-2">
                    <div className="flex w-full justify-between items-center">
                        <h2 className="font-mono text-sm opacity-40 p-2">App.jsx</h2>
                        <div className="flex space-x-2">
                            <button onClick={handleRunCode} className="bg-[#7b9acc] rounded-md hover:scale-105">
                                <div className="relative">
                                    <div className="flex items-center space-x-2 px-2 py-1">
                                        <FaPlay className="w-3 h-3"/>
                                        <h3 className="text-sm font-extrabold">Run</h3>
                                    </div>
                                    <span
                                        className="absolute inset-0 border-2 border-transparent rounded-md transition duration-500 
                                        hover:rounded-lg spin hover:border-white"
                                    ></span>
                                </div>
                            </button>
                            {submit && 
                                <button onClick={handleRunCode} className="bg-[#7b9acc] rounded-md hover:scale-105">
                                    <div className="relative">
                                        <div className="flex items-center space-x-1 px-2 py-1">
                                            <MdFileUpload className="w-5 h-5"/>
                                            <h3 className="text-sm font-extrabold">Submit</h3>
                                        </div>
                                        <span
                                            className="absolute inset-0 border-2 border-transparent rounded-md transition duration-500 
                                            hover:rounded-lg spin hover:border-white"
                                        ></span>
                                    </div>
                                </button>
                            }
                        </div>
                    </div>
                    <div className="flex-grow w-full bg-white">
                        <Editor
                            defaultLanguage="javascript"
                            defaultValue={defaultCode}
                            onMount={handleEditorDidMount}
                        />
                    </div>
                    
                </div>
            </ResizablePanel>
            <ResizableHandle />
            {submit ?
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={70}>
                            <div className="flex flex-col gap-2 p-2 h-full">
                                <h2 className="font-mono text-sm opacity-40 p-2">http://localhost:3000/</h2>
                                <div ref={iframeContainerRef} className="flex w-full h-full items-center justify-center p-6 bg-white rounded-md"></div>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        
                        <ResizablePanel defaultSize={30}>
                            <div className="flex flex-col h-full p-2">
                                <h2 className="font-mono text-sm opacity-40 p-2">requirements.txt</h2>
                                <h2 className="text-sm p-2">Project: To-Do List</h2>
                                <ul className="text-sm p-2">
                                    <li><MdOutlineCheckBoxOutlineBlank className="inline"/> Add tasks to a list.</li>    
                                    <li><MdOutlineCheckBoxOutlineBlank className="inline"/> Mark tasks as completed.</li>
                                    <li><MdOutlineCheckBoxOutlineBlank className="inline"/>  Delete tasks from the list.</li>
                                </ul>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            :
                <ResizablePanel>
                    <div className="flex flex-col gap-2 p-2 h-full">
                        <h2 className="font-mono text-sm opacity-40 p-2">http://localhost:3000/</h2>
                        <div ref={iframeContainerRef} className="flex w-full h-full items-center justify-center p-6 bg-white rounded-md"></div>
                    </div>
                </ResizablePanel>
            }
        </ResizablePanelGroup>
    )
}