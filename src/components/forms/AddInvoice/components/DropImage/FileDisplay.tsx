import { Image } from "@heroui/react";
import CloseIcon from "@assets/icons/CloseIcon";
import ContentIcon from "@assets/icons/ContentIcon";
import { useController, useFormContext } from "react-hook-form";

type Props = {
  open: () => void;
  name: string;
};

export default function FileDisplay({ open, name }: Props) {
  const renderBody = (file: File | string) => {
    if (!file)
      return (
        <div className="h-full flex justify-center items-center text-sm">
          <ContentIcon className="text-default-300" height={48} width={48} />
        </div>
      );
    if (typeof file === "string")
      return (
        <Image
          alt="biller logo"
          className="object-contain"
          height={64}
          radius="none"
          src={file}
        />
      );
    if (file?.type?.includes("image")) {
      return (
        <Image
          alt="biller logo"
          className="object-contain"
          height={32}
          radius="none"
          src={URL.createObjectURL(file)}
        />
      );
    }
    return (
      <div className="h-full flex justify-center items-center text-sm">
        <ContentIcon className="text-default-300" height={48} width={48} />
      </div>
    );
  };

  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const removeFile = () => onChange(null);
  if (!value) return null;

  return (
    <div className="w-full">
      <div className="flex justify-center items-center gap-4 py-6">
        <div className="relative p-4 pb-1">
          {renderBody(value)}
          <button onClick={() => removeFile()}>
            <CloseIcon
              className="absolute -top-2 -right-2 cursor-pointer text-danger"
              height={24}
              width={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
