import { Chip, Divider, Spacer, Spinner } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import Button from "@components/atomic/Button";
import Input from "@components/atomic/Input";
import Modal, {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@components/atomic/Modal";
import Switch from "@components/atomic/Switch";

import { invoiceNumberSchema } from "../schema";
import { useTimberClient } from "@providers/TimberProvider";
import Form from "@components/atomic/Form";

type EditInvoiceUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InvoiceNumberSettingsModal({
  isOpen,
  onClose,
}: EditInvoiceUserModalProps) {
  const timberClient = useTimberClient();
  const { data: invoiceNumber, isPending: isPendingGetInvoiceNumber } =
    useQuery({
      queryKey: ["invoiceNumber"],
      queryFn:()=> timberClient.invoiceNumber.get(),
      select: (res: any) => res.data.data,
    });
  console.log(" invoiceNumber:", invoiceNumber);
  console.log(" isPendingGetInvoiceNumber:", isPendingGetInvoiceNumber);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["allInvoiceCustomers"],
    queryFn: () => timberClient.customer.list(),
    select: (res: any) => res.data.data as any,
  });
  console.log(" data:", data);

  const queryClient = useQueryClient();
  const handleSubmit = async (values: any) => {
    await timberClient.invoiceNumber.update({
      enabled: values.enabled,
      next_number: values.next_number,
      sequence_length: values.sequence_length,
      prefix: values.prefix,
    });
    toast.success("Invoice numbering settings updated successfully");
    queryClient.invalidateQueries({ queryKey: ["invoiceNumber"] });
    queryClient.invalidateQueries({ queryKey: ["getNextInvoiceNumber"] });
    onClose();
  };

  const calcNextNumber = (
    prefix: String,
    next_number: number,
    sequence_length: number
  ) => {
    const length = sequence_length || 6;
    const numStr = `${next_number}`;
    const last_invoice_number =
      "0".repeat(Math.max(0, length - numStr.length)) + numStr;
    return `${prefix}${last_invoice_number}`;
  };

  return (
    <Modal isOpen={isOpen} size="xl" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Invoice Numbering</ModalHeader>
        {isPendingGetInvoiceNumber || !invoiceNumber ? (
          <div className="my-10 flex justify-center">
            <Spinner />
          </div>
        ) : (
          <Form
            defaultValues={invoiceNumber}
            schema={invoiceNumberSchema}
            onSubmit={handleSubmit}
          >
            {({ getValues, formState }) => (
              <>
                <ModalBody>
                  <Switch name="enabled" size="sm">
                    Enable Automatic Invoice numbering{" "}
                  </Switch>
                  <Spacer y={1} />
                  <div className="grid grid-cols-4 gap-2 items-start">
                    <Input
                      className="col-span-1"
                      label="Prefix"
                      name="prefix"
                      placeholder="Enter prefix"
                    />
                    <Input
                      isRequired
                      className="col-span-3"
                      label="Next Number"
                      name="next_number"
                      placeholder="Enter next number"
                      type="number"
                    />
                  </div>
                  <Spacer y={1} />
                  <Input
                    isRequired
                    label="Sequence Length"
                    max={15}
                    min={1}
                    name="sequence_length"
                    placeholder="Enter sequence length"
                    type="number"
                  />
                  <Spacer y={1} />
                  <div className="flex gap-2 items-center">
                    <p className="text-sm">Next Invoice Number will be:</p>
                    <Chip color="default" radius="md">
                      {calcNextNumber(
                        getValues()?.prefix,
                        getValues()?.next_number,
                        getValues()?.sequence_length
                      )}
                    </Chip>
                  </div>
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
                        isLoading={formState.isSubmitting}
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
        )}
      </ModalContent>
    </Modal>
  );
}
