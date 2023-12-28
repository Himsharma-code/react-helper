import ReactDropzone from "@/components/ReactDropzone";

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
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-12">
      {getComponent()}
    </div>
  );
}
