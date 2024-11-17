"use server"

import { VertexAI } from "@google-cloud/vertexai";

const vertexAI = new VertexAI(
    {project: process.env.GCP_PROJECT_ID!, location: "us-west1"}
);

export default async function analyzeUpload(gsutilURI: string) {
    const generativeModel = vertexAI.getGenerativeModel({
        model: "gemini-1.5-flash-001",
    });

    const filePart = {
        file_data: {
            file_uri: gsutilURI,
            mime_type: "video/mp4",
        }
    };

    const textPart = {
        text: `For the video provided, please provide detailed feedback on how
to make the video more engaging on social media before this video is posted to
social media. Please feel free to refer to specific segements of the video by
the timestamps and provide detailed and specific feedback about how that segment
of the video can be made more engaging for humans to watch.

Here is an example of some output you can provide for an arbitrary video:
[00:00:00 - 00:00:01]: Change the intro to jump into the hook directly by changing 
the opening line to "Here's how an AI model created a memecoin worth $1B" rather
than "Here's is what interesting news has happened in the AI space this week"
[00:00:02 - 00:00:05]: Display news clippings of the AI news you are referring to
while talking about them instead of just reciting the headlines without any changes
to the visual setting of the video.
[<example_segment_start_timestamp> - <example_segment_end_timestamp>]: <example_feedback>

DO NOT RECITE THE ABOVE EXAMPLE VERBATIM AND INSTEAD WATCH THE VIDEO AND PROVIDE FEEDBACK
IN THE PREVIOUSLY DESCRIBED FORMAT THAT IS TAILORED AND SPECIFIC TO THE VIDEO PROVIDED WITH
THE PROMPT. INCLUDE POSITIVE FEEDBACK AND NEGATIVE FEEDBACK FOR EACH CONTIGUOUS LOGICAL VIDEO
SEGEMENT.`
    };

    const request = {
        contents: [{ role: "user", parts: [ filePart, textPart ]}],
    };

    const response = await generativeModel.generateContent(request);
    const contentResponse = await response.response; 
    return JSON.stringify(contentResponse);
}