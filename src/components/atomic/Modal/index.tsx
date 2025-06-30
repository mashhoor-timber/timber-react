import { useEffect } from 'react';

import { ModalProps, Modal as NextModal, Image } from '@heroui/react';
import clsx from 'clsx';

import crossIcon from '../../../assets/icons/cross.svg';
// import { useDirection } from '@hooks/useDirection';

export default function Modal({ children, ...props }: ModalProps) {
    // const { direction } = useDirection();
    useEffect(() => {
        if (props.isOpen) document.body.style.overflowY = 'hidden';
        else document.body.style.overflowY = 'auto';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [props.isOpen]);

    return (
        <NextModal
            classNames={{
                base: 'bg-background rounded-3xl',
                closeButton: clsx('top-[10px]'),
            }}
            closeButton={<Image src={crossIcon} width={24} height={24} />}
            isDismissable={false}
            placement="center"
            {...props}
        >
            {children}
        </NextModal>
    );
}

export { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
