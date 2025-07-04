import { useEffect, useRef, useState } from "react";

import { Image, Progress } from "@heroui/react";
import axios, { CancelTokenSource } from "axios";
import { pdfjs } from "react-pdf";
import { toast } from "sonner";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import RenderPdf from "./RenderPdf";
import ContentIcon from "@assets/icons/ContentIcon";
import { useTimberClient } from "@providers/TimberProvider";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

interface FileWithId extends File {
  id: string;
}
type Props = {
  open: () => void;
  files: FileWithId[];
  setFiles: (files: FileWithId[]) => void;
  onSuccess?: () => void;
};

export default function FileDisplay({
  open,
  files,
  setFiles,
  onSuccess,
}: Props) {
  const timberClient = useTimberClient();

  const onUpload = async (file: FileWithId) => {
    try {
      const fileToUpload = file;

      await timberClient.bankStatement.create({
        file: fileToUpload,
        progressCallback: setProgress,
        cancelToken: cancelTokenRef.current,
      });
      setFiles([]);
      onSuccess?.();
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      setFiles([]);
    }
  };

  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(0);
  const cancelTokenRef = useRef<CancelTokenSource>(axios.CancelToken.source());
  const currentFileRef = useRef<FileWithId | null>(null);

  useEffect(() => {
    const upload = async () => {
      if (files.length > 0 && files[0] !== currentFileRef.current) {
        startTimeRef.current = new Date().getTime();
        currentFileRef.current = files[0];
        const fileToUpload = files[0];

        await onUpload(fileToUpload);
      }
    };
    upload();
  }, [files]);

  const renderBody = (file: File) => {
    if (!file) return null;
    if (file.type.includes("image")) {
      return (
        <Image
          alt="Invoice"
          className="object-cover"
          height={200}
          radius="none"
          src={URL.createObjectURL(file)}
          width={0}
        />
      );
    }
    if (file.type.includes("pdf")) {
      return <RenderPdf file={file as FileWithId} />;
    }
    return (
      <div className="h-[184px] flex justify-center items-center text-sm">
        <ContentIcon height={48} width={48} />
      </div>
    );
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((f: FileWithId) => f.id !== id));
  };

  if (files.length === 0) return null;

  return (
    <div className="border rounded relative">
      <div className="rounded overflow-hidden">{renderBody(files[0])}</div>
      <div className="absolute bottom-0 w-full">
        <div className="w-full border-t bg-default-100 p-2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs line-clamp-1">Uploading...</span>
          </div>
          <Progress isDisabled size="sm" value={progress} />
        </div>
      </div>
    </div>
  );
}
