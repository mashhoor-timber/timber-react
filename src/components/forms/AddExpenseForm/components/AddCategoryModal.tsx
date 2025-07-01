import { Divider, Spacer } from "@heroui/react";
import { Form, Formik } from "formik";

import Button from "@components/atomic/Button";
import Input from "@components/atomic/Input";
import Modal, {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@components/atomic/Modal";

import { expenseCategorySchema } from "../schema";

type AddCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddCategoryModal({
  isOpen,
  onClose,
}: AddCategoryModalProps) {

  // const { mutate, isPending } = useMutation({
  //     mutationFn: addExpenseCategory,
  //     onSuccess: res => {
  //         toast.success(`Category added successfully`);
  //         queryClient.invalidateQueries({ queryKey: ['getCategories'] });
  //         onClose();
  //     },
  //     onError: (error: any) => {
  //         const message = error?.response?.data?.message || 'Something went wrong';
  //         toast.error(message);
  //     },
  // });

  const handleSubmit = async (values: any) => {
    //todo
  };

  const company = ""; //todo
  return (
    <Modal isOpen={isOpen} size="xl" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Add New Category</ModalHeader>
        <Formik
          initialValues={{
            company: company,
            category: "",
          }}
          validationSchema={expenseCategorySchema}
          onSubmit={(values: any) => {
            handleSubmit(values);
          }}
        >
          {({ submitForm, isValid }: any) => (
            <Form className="">
              <ModalBody>
                <Input
                  isRequired
                  label="Category"
                  name="category"
                  placeholder="Enter category"
                  formLib="formik"
                />
              </ModalBody>
              <ModalFooter>
                <div className="w-full">
                  <Divider />
                  <Spacer y={4} />
                  <div className="flex justify-end gap-2">
                    <Button color="white" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      isDisabled={!isValid}
                      // isLoading={isPending}
                      type="submit"
                    >
                      Submit
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
