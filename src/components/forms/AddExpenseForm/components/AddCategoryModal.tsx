import { Divider, Spacer } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import Input from '@components/atomic/Input';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@components/atomic/Modal';
import { useAppSelector } from '@hooks/store';

import { addExpenseCategory } from '../api/expenseApi';
import { expenseCategorySchema } from '../schema';

type AddCategoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const { mutate, isPending } = useMutation({
        mutationFn: addExpenseCategory,
        onSuccess: res => {
            toast.success(t('modal.add_category.form.toast', { ns: 'expense' }));
            queryClient.invalidateQueries({ queryKey: ['getCategories'] });
            onClose();
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });

    const company = useAppSelector(state => state.company);
    return (
        <Modal isOpen={isOpen} size="xl" onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader>{t('modal.add_category.title', { ns: 'expense' })}</ModalHeader>
                <Formik
                    initialValues={{
                        company: company._id,
                        category: '',
                    }}
                    validationSchema={expenseCategorySchema}
                    onSubmit={values => {
                        mutate(values);
                    }}
                >
                    {({ submitForm, isValid }) => (
                        <Form className="">
                            <ModalBody>
                                <Input
                                    isRequired
                                    label={t('modal.add_category.form.label', { ns: 'expense' })}
                                    name="category"
                                    placeholder={t('modal.add_category.form.placeholder', {
                                        ns: 'expense',
                                    })}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <div className="w-full">
                                    <Divider />
                                    <Spacer y={4} />
                                    <div className="flex justify-end gap-2">
                                        <Button color="white" variant="light" onPress={onClose}>
                                            {t('modal.add_category.form.cancel', { ns: 'expense' })}
                                        </Button>
                                        <Button
                                            color="primary"
                                            isDisabled={!isValid}
                                            isLoading={isPending}
                                            type="submit"
                                        >
                                            {t('modal.add_category.form.submit', { ns: 'expense' })}
                                        </Button>
                                    </div>
                                </div>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
}
