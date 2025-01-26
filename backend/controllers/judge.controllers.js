import dotenv from 'dotenv';
import app2 from '../server.js';
import PowerShell from "powershell";
import { generate } from '../llm_server/server.js';
import {writeFile} from 'fs/promises';

dotenv.config();


export const getChallenge = async(req, res)=>{
    console.log("Generating challenge");
    const {dif} = req.body;
    try{
        const result = await generate(dif);
        console.log(result);
        const upResult = JSON.parse(result);
        const cypressText = upResult.cypress;
        console.log(typeof(cypressText));
        try{
            await writeFile('./cypress/e2e/validateCode.cy.js', cypressText);
            console.log("File written succesfully")
        }catch(err){
            console.error('Error writing file:', err);
        }
        res.status(200).json(upResult);
    }catch(error){
        console.error('Error: '+ error.message);
    }
}


export const trigger = async(req, res)=>{
    console.log('Triggering Cypress tests...');
    let ps = new PowerShell("npx cypress run");
    try{
        ps.on("output", data =>{
            console.log("Cypress Test Output:", data);
            console.log(typeof(data));
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