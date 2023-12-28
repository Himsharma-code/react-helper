"use client";
import ReactImageCrop from "@/components/ReactImageCrop";
import ReactDropzone from "@/components/ReactDropzone";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Component({
  params,
}: {
  params: { component: string };
}) {
  const { component } = params;

  const getComponent = () => {
    switch (component) {
      case "react-dropzone":
        return <ReactDropzone />;
      case "react-image-crop":
        return <ReactImageCrop />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <Button href="/" as={Link} size="sm">
        Back
      </Button>
      <div className="flex  flex-col items-center justify-between py-12">
        {getComponent()}
      </div>
    </div>
  );
}
