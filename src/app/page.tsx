import Link from "next/link";

export default function Home() {
  return (
    <main className="flex gap-2 min-h-screen flex-col  p-12">
      <div>
        <Link href="/react-dropzone">File drag and drop upload</Link>
      </div>
      <div>
        <Link href="/react-image-crop">Image cropper</Link>
      </div>
    </main>
  );
}
