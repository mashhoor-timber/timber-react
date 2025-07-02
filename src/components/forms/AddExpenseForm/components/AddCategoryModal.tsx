import { Divider, Spacer } from "@heroui/react";

import Button from "@components/atomic/Button";
import Input from "@components/atomic/Input";
import Modal, {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@components/atomic/Modal";

import { expenseCategorySchema } from "../schema";
import Form from "@components/atomic/Form";
import { useTimberClient } from "providers/TimberProvider";

type AddCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddCategoryModal({
  isOpen,
  onClose,
}: AddCategoryModalProps) {
  const timberClient = useTimberClient();

  const onSubmit = async (values: any) => {
    try {
      await timberClient.expenseCategory.create(values);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Modal isOpen={isOpen} size="xl" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Add New Category</ModalHeader>
        <Form
          defaultValues={{
            category: "",
          }}
          schema={expenseCategorySchema}
          onSubmit={onSubmit}
        >
          {({ formState: { isSubmitting, isValid, isDirty, errors } }) => (
            <>
              <ModalBody>
                <Input
                  isRequired
                  label="Category"
                  name="category"
                  placeholder="Enter category"
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
                      //   isDisabled={!isValid}
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </Form>
      </ModalContent>
    </Modal>
  );
}
