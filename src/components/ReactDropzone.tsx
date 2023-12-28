"use client";
import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

type FileWithPreview = File & Partial<{ preview: string }>;

interface FileTypeToHTMLTagProps {
  fileType: string;
  source: string | undefined;
}

function getFileTypeHTMLTag({
  fileType,
  source,
}: FileTypeToHTMLTagProps): JSX.Element | null {
  let htmlTag: JSX.Element | null = null;

  switch (fileType) {
    case "application/pdf":
      htmlTag = <embed src={source} type={fileType} />;
      break;
    case "application/zip":
      htmlTag = (
        <a href="sample.zip" download>
          Download Zip File
        </a>
      );
      break;
    case "image/jpeg":
    case "image/png":
    case "image/gif":
    case "image/webp":
      htmlTag = <img src={source} alt="Sample Image" />;
      break;
    case "audio/mpeg":
    case "audio/wav":
      htmlTag = (
        <audio controls>
          <source src={source} type={fileType} />
          Your browser does not support the audio element.
        </audio>
      );
      break;
    case "video/mp4":
    case "video/quicktime":
    case "video/webm":
      htmlTag = (
        <video controls>
          <source src={source} type={fileType} />
          Your browser does not support the video element.
        </video>
      );
      break;
    case "text/html":
      htmlTag = <iframe src={source} />;
      break;
    default:
      htmlTag = <div>Unsupported File Type</div>;
      break;
  }

  return htmlTag;
}
const ReactDropzone = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = (acceptedFiles: FileWithPreview[]) => {
    setFiles([
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
      ...files,
    ]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/*": [".pdf", ".zip"],
      "image/*": [".jpeg", ".png", ".gif", ".webp"],
      "audio/*": [".mpeg", ".wav"],
      "video/*": [".mp4", ".mov", ".webm"],
      "text/html": [".html"],
    },
    onDrop,
  });

  return (
    <div className="bg-gray-800 p-4 rounded-md max-w-[500px] w-[100%] ">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-600 rounded-md p-6 text-center ${
          isDragActive ? "border-blue-500" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the files here ...</p>
        ) : (
          <p className="text-gray-400">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      <div className="mt-4 max-h-[calc(100vh_-_325px)] overflow-auto">
        {files.map((file, index) => (
          <div
            key={file.name}
            className="flex items-center justify-between bg-gray-700 p-2 rounded-md mb-2"
          >
            <div className="flex items-center justify-center max-w-[100px] w-[100%] mr-2 aspect-video">
              {getFileTypeHTMLTag({
                fileType: file.type,
                source: file.preview,
              })}
            </div>
            <span className="text-gray-300">{file.name}</span>
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => {
                const newFiles = [...files].filter((file, i) => i !== index);
                setFiles(newFiles);
              }}
            >
              Remove
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactDropzone;
