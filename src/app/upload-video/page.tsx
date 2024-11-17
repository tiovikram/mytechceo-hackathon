"use client"

import { useState } from "react";

import AnalyzeVideoButton from "@/app/upload-video/components/analyze-video-button";
import UploadVideoButton from "@/app/upload-video/components/upload-video-button";

export default function UploadVideoPage() {

    const [ videoGsutilURI, setVideoGsutilURI ] = useState<string | null>(null);
    console.log(videoGsutilURI ? videoGsutilURI : "null");

  return (
    <>
      <UploadVideoButton
        setVideoGsutilURI={setVideoGsutilURI}
      />
      {
        videoGsutilURI ? 
            <AnalyzeVideoButton
                videoGsutilURI={videoGsutilURI}
            />
        :
            <></>
      }
    </>
  );

}