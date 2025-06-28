import { useEffect } from 'react';

import { ModalProps, Modal as NextModal } from '@heroui/react';
import clsx from 'clsx';
import { ReactSVG } from 'react-svg';

import crossIcon from '@assets/icons/cross.svg';
import { useDirection } from '@hooks/useDirection';

export default function Modal({ children, ...props }: ModalProps) {
    const { direction } = useDirection();
    useEffect(() => {
        if (props.isOpen) document.body.style.overflowY = 'hidden';
        else document.body.style.overflowY = 'auto';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [props.isOpen, direction]);

    return (
        <NextModal
            classNames={{
                base: 'bg-background rounded-3xl',
                closeButton: clsx('top-[10px]', direction === 'rtl' ? 'left-4' : 'right-4'),
            }}
            closeButton={<ReactSVG height={28} src={crossIcon} width={28} />}
            isDismissable={false}
            placement="center"
            {...props}
        >
            {children}
        </NextModal>
    );
}

export { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
