//import {exec } from 'child_process';
//import express from 'express';
import dotenv from 'dotenv';
import app2 from '../server.js';
import PowerShell from "powershell";

dotenv.config();

export const trigger = async(req, res)=>{
    console.log('Triggering Cypress tests...');
    let ps = new PowerShell("npx cypress run");
    try{
        ps.on("output", data =>{
            console.log("Cypress Test Output:", data);
            res.status(200).send({
                message: 'Cypress tests completed successfully.',
                data,
            });
        });
    }catch (error){
        console.error('Error executing Cypress tests:', error);
        ps.on("error-output",data=>{
            console.error(data);
        });
        res.status(500).send({
            message: 'Cypress test failed,',
            error: error.message,
        });
    } finally{
        ps.on("end",code=>{
            console.log("yay");
        });
    }  
    // exec('npx cypress run --headless',{cwd: "../"} ,(error, stdout, stderr) =>{
    //     if(error){
    //         console.log(`Error executing Crypress tests: ${error.message}`);
    //         return res.status(500).send({message: 'Crypress tests failed.', error: error.message});
    //     }
    //     console.log('Cypress Output: '+ stdout);
    //     if(stderr){
    //         console.error('Cypress Errors:' + stderr);
    //     }

    //     return res.status(200).send({message: 'Cypress tests completed successfully.', outout: stdout});
    // })
}

export const getCode = async (req, res) =>{
    const {transformedCode} = req.body;
    //console.log(transformedCode);

    if(!transformedCode){
        return res.status(400).json({error: "No code submitted"})
    }

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
                    ${transformedCode};
                `;

    const template = `
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
        `;
        const removeRoute = (path, method) => {
            app2._router.stack = app2._router.stack.filter((layer) => {
                return !(layer.route && layer.route.path === path && layer.route.methods[method]);
            });
        };
        removeRoute("/","get");
        app2.get("/", (req, res) => {
            res.send(template);
        });
    try{  
        res.status(200).json({message: "Submitted Code successfully", success: "true"});
    }catch(error){
        console.error('Error:'+ errors);
        res.status(500).json({message: "Server Error", success: "false"} );
    }
       
}