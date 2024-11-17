"use client"

import { useState } from "react";

import analyzeVideo from "@/app/upload-video/server/analyze-upload";

export default function AnalyzeVideoButton(
    { videoGsutilURI }: {videoGsutilURI: string}
) {

    const [ videoFeedback, setVideoFeedback ] = useState<string | null>(null);

    async function inititateVideoAnalysis(videoGsutilURI: string)  {
        analyzeVideo(videoGsutilURI).then(
            (videoFeedbackResponse: string) => {
                setVideoFeedback(videoFeedbackResponse);
            },
            (error: Error) => {
                console.log(error);
            }
        )
    }

    return (
        <>
            <button
                className="bg-gray-300"
                onClick={() => inititateVideoAnalysis(videoGsutilURI)}
            >
                Analyze Video
            </button>
            {
                videoFeedback ? videoFeedback : <></>
            }
        </>
    );
}