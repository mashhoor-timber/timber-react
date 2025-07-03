import { useEffect } from "react";

import { ModalProps, Modal as NextModal } from "@heroui/react";
import CloseIcon from "../../../assets/icons/CloseIcon";

// import { useDirection } from '@hooks/useDirection';

export default function Modal({ children, ...props }: ModalProps) {
  // const { direction } = useDirection();
  useEffect(() => {
    if (props.isOpen) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [props.isOpen]);

  return (
    <NextModal
      classNames={{
        base: "bg-background rounded-3xl",
        closeButton: "right-4 top-[10px]",
      }}
    //   closeButton={<CloseIcon width={28} height={28} className="text-black" />}
      isDismissable={false}
      placement="center"
      {...props}
    >
      {children}
    </NextModal>
  );
}

export {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
