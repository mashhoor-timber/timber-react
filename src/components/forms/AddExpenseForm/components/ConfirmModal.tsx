import Button from '@components/atomic/Button';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '../../../atomic/Modal';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }: ConfirmModalProps) {
    return (
        <Modal
            classNames={{
                base: 'rounded-3xl bg-background',
            }}
            closeButton={<></>}
            isOpen={isOpen}
            placement="center"
            radius="lg"
            size="lg"
            onClose={onClose}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
                <ModalBody>
                    <p>{message}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={onConfirm}>
                        Proceed
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
