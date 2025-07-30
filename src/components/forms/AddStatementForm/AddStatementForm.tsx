import { useMemo, useState } from "react";

import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line import/order
import { Divider } from "@heroui/react";

import Button from "@components/atomic/Button";

import FileDisplay from "./components/PdfDropzone/FileDisplay";
import UploadIcon from "@assets/icons/UploadIcon";
import { AddStatementFormProps } from "./types";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

interface FileWithId extends File {
  id: string;
}

// const validator = (file: File) => {
//     if (file.size > 10485760) {
//         return {
//             code: 'file-too-large',
//             message: 'File size is too large111',
//         };
//     }
//     return null;
// };

const onDropRejected = (fileRejections: FileRejection[]) => {
  fileRejections.forEach((file) => {
    file.errors.forEach((err) => {
      if (err.code === "file-invalid-type") {
        toast.error("Invalid file type. Only PDF and image files are allowed.");
      }
      if (err.code === "file-too-large") {
        toast.error("File is too large. Maximum file size is 10MB.");
      }
      if (err.code === "too-many-files") {
        toast.error("Too many files. Maximum number of files is 10.");
      }
    });
  });
};

const defaultAccept = {
  // 'image/*': [],
  "application/pdf": [],
};

export const AddStatementForm: React.FC<AddStatementFormProps> = ({
  // name,
  multiple = false,
  maxFiles = 10,
  accept = defaultAccept,
  maxSize = 5 * 1024 * 1024,
  disabled = false,
  title,
  width,
  height,
  onSuccess,
}) => {
  const [files, setFiles] = useState<FileWithId[]>([]);

  const onDrop = (fls: File[]) => {
    const filesWithId = fls.map((file) => {
      const fileWithId = file as FileWithId;
      fileWithId.id = uuidv4();
      return fileWithId;
    });
    setFiles([...files, ...filesWithId]);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple,
    maxFiles,
    accept,
    disabled,
    maxSize,
    onDropRejected,
    noClick: files.length > 0,
  });

  const renderBody = useMemo(() => {
    if (files.length === 0) {
      return (
        <div className="flex flex-col items-center sm:p-4 p-2 sm:gap-4 gap-2">
          <p className="font-semibold text-sm sm:text-base">{title}</p>
          <UploadIcon
            className={`${isDragActive ? "bg-primary-50" : ""}`}
            height={35}
            width={35}
          />
          <p className="sm:text-sm font-semibold text-xs text-center">
            Drag your file to start uploading
          </p>
          <div className="flex items-center justify-center gap-2">
            <Divider className="w-[60px]" />
            <span className="text-sm text-default-400">OR</span>
            <Divider className="w-[60px]" />
          </div>
          <Button color="white" size="md" onClick={open}>
            Browse files
          </Button>
        </div>
      );
    }
    return (
      <div className="w-full h-full flex justify-center items-center p-2">
        <FileDisplay
          files={files}
          open={open}
          setFiles={setFiles}
          onSuccess={onSuccess}
        />
      </div>
    );
  }, [files, isDragActive]);

  return (
    <div
      {...getRootProps()}
      className={`w-full h-full p-1 border border-1 rounded-lg bg-light flex flex-col justify-center items-center text-default-700 cursor-pointer ${
        isDragActive ? "bg-primary-50" : ""
      }`}
    >
      <input {...getInputProps()} />
      {renderBody}
    </div>
  );
};
