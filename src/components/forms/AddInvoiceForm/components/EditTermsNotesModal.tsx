import { useState } from "react";

import { Divider, Spacer } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { toast } from "sonner";

import Button from "@components/atomic/Button";
import Input from "@components/atomic/Input";
import Modal, {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@components/atomic/Modal";

import "react-quill-new/dist/quill.snow.css";
import { invoiceTemplateSchema } from "../schema";
import { CreateInvoiceValues } from "../types";
import Form from "@components/atomic/Form";
import { useTimberClient } from "@providers/TimberProvider";

type EditTermsNotesModalProps = {
  documentId: string;
  type: "terms" | "notes";
  isOpen: boolean;
  onClose: () => void;
  selectedItem: any;
  mode: "edit" | "create";
};

export default function EditTermsNotesModal({
  documentId,
  type,
  isOpen,
  onClose,
  selectedItem,
  mode,
}: EditTermsNotesModalProps) {
  const queryClient = useQueryClient();
  const { setValue } = useFormContext<CreateInvoiceValues>();

  const [editorContent, setEditorContent] = useState(
    selectedItem?.content || ""
  );

  const timberClient = useTimberClient();

  const {
    data: company,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => timberClient.company.get(),
    select: (res: any) => res.data.data,
    enabled: !!timberClient,
  });

  return (
    <Modal isOpen={isOpen} size="xl" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          {type === "terms" ? "Terms and Conditions" : "Notes"}{" "}
        </ModalHeader>
        <Form
          defaultValues={{
            company: company?._id,
            _id: selectedItem?._id || "",
            content: editorContent || "",
            name: selectedItem?.name || "",
            type,
          }}
          schema={invoiceTemplateSchema}
          onSubmit={(values) => {
            if (mode === "edit") {
              if (type === "terms") {
                setValue("terms", editorContent);
              }
              if (type === "notes") {
                setValue("notes", editorContent);
              }
            }
          }}
        >
          {() => (
            <>
              <ModalBody>
                <Input
                  isRequired
                  className="hidden"
                  label="Name"
                  name="name"
                  placeholder="Enter name"
                />

                {/* Rich Text Editor for Content */}
                <ReactQuill
                  className="my-3 h-[200px]"
                  theme="snow"
                  value={editorContent}
                  onChange={setEditorContent}
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
                      isLoading={isPending}
                      type="submit"
                    >
                      Update
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
