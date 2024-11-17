"use server"

import stream from "stream";

import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucketName = "mytechceo-hackathon";


export default async function uploadVideo(filenameInBucket: string, file: ArrayBuffer): Promise<string> {
    const bucket = storage.bucket(bucketName);
    const bucketFile = bucket.file(filenameInBucket);

    const intermediateStream = new stream.PassThrough();
    intermediateStream.write(file);
    intermediateStream.end();

    intermediateStream.pipe(bucketFile.createWriteStream().on(
        "finish", () => {
            console.log("File Upload complete");
        }
    ).on(
        "error", (error) => {
            throw error;
        }
    ));

    return "";
}