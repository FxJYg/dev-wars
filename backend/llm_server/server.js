import OpenAI from "openai";
import dotenv from 'dotenv';
import { promptGen } from "./statics.js";
import {zodResponseFormat} from 'openai/helpers/zod';
import {z} from "zod";

dotenv.config();

const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const response = z.object({
    name: z.string(),
    tasklist: z.array(z.object({
        tasknum: z.number(),
        title: z.string(),
        elementID: z.string(),
        description: z.string()
    })),
    cypress: z.string(),
});



export const generate = (dif) => {

const chatCompletion = openAIClient.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages:[{
        role: "system",
        content : promptGen
    },{
        role: "user",
        content : dif
    }],
    response_format: zodResponseFormat(response, "event"),
})

    let result;
chatCompletion.then((data) => {
    result = data.choices[0].message;
});

    return result;
}
