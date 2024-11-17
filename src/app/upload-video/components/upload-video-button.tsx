"use client"

import { IoIosCloudUpload } from "react-icons/io";
import { useState } from "react";

import uploadVideo from "@/app/upload-video/server/upload-video";

const gsutilURIPrefix = "gs://mytechceo-hackathon/";

export default function UploadVideoButton(
    { setVideoGsutilURI }: { setVideoGsutilURI: (videoGsutilURI: string) => void }
) {
  const [file, setFile] = useState<File | null>(null);

  const clickFileUpload = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  }

  const handleFileChange = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput.files) {
      setFile(fileInput.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const filenameComponents = file.name.split(".");        
    const filenameInBucket = `${filenameComponents[0]}-${crypto.randomUUID()}.${filenameComponents[1]}`;

    uploadVideo(filenameInBucket, await file.bytes()).then(
        () => {},
        (error: Error) => {
            console.log(error.toString());
        }
    ); 

    const gsutilURI = `${gsutilURIPrefix}${filenameInBucket}`;
    setVideoGsutilURI(gsutilURI);
  };

  return (
    <>
      <div className="w-3/12">
        <div className="rounded-xl p-0.5 w-fit border border-gray-400 border-dashed margin-top-20">
          <div className="bg-gray-300 rounded-xl p-5 w-fit">
            <input type="file" onChange={handleFileChange}
                accept="video/mp4"
                id="fileInput"
                style={{ display: "none" }}
            />
            <button onClick={clickFileUpload}>
              <div className="display: flex justify-center flex-col items-center">
                <IoIosCloudUpload />
                <p>Upload a video</p>
              </div>
            </button>
          </div>
        </div>
        <button
            className="bg-gray-300 rounded-lg px-2 py-0.5 w-full"
            onClick={async () => { await handleUpload() }}
        >Upload</button>
      </div>
    </>
  );
}