import { useEffect } from "react";

import { ModalProps, Modal as NextModal } from "@heroui/react";

import crossIcon from "../../../assets/icons/cross.svg";
import { ReactSVG } from "react-svg";
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
        closeButton: "top-[10px]",
      }}
      closeButton={<ReactSVG src={crossIcon} className="text-black" width={24} height={24} />}
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
