import { useState } from "react";

import { useDisclosure } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css";
import { CreateInvoiceValues } from "../types";
import EditPenIcon from "@assets/icons/EditPenIcon";

// import { getInvoiceTemplates } from '../../api/invoice';
// import { CreateInvoiceValues } from '../../types';
// import EditTermsNotesModal from '../EditTermsNotesModal';

const modules = {
  toolbar: false, // Hide toolbar if only displaying content
  clipboard: { matchVisual: false },
  history: { delay: 2000, maxStack: 500, userOnly: true },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
];

function TermsAndConditions() {
  // const company = useAppSelector(state => state.company);
  const { control, setValue } = useFormContext<CreateInvoiceValues>();

  const {
    field: { value: mode },
  } = useController({
    name: "mode",
    control,
  });

  const {
    field: { value: termsValue },
  } = useController({
    name: "terms",
    control,
  });

  const {
    field: { value: notesValue },
  } = useController({
    name: "notes",
    control,
  });

  const [selectedItem, setSelectedItem] = useState<any>();
  const [type, setType] = useState<"terms" | "notes">("terms");
  const editModal = useDisclosure();

  // const { data, isLoading } = useQuery({
  //     queryKey: ['invoiceTemplates', company?._id],
  //     queryFn: () => getInvoiceTemplates({ company: company?._id }),
  // });

  // Mock data for demonstration purposes
  const data = {
    invoice_template: {
      terms: [
        {
          _id: "term1",
          name: "Standard Terms",
          content: "These are the standard terms and conditions.",
        },
      ],
      notes: [
        {
          _id: "note1",
          name: "Important Note",
          content: "This is an important note for the invoice.",
        },
      ],
    },
  };
  const isLoading = false;

  if (mode === "create") {
    const latestTerm = data?.invoice_template.terms?.[0]?.content || "";
    const latestNote = data?.invoice_template.notes?.[0]?.content || "";

    if (latestTerm !== termsValue) {
      setValue("terms", latestTerm);
    }
    if (latestNote !== notesValue) {
      setValue("notes", latestNote);
    }
  }

  const handleEditTerms = () => {
    setType("terms");
    setSelectedItem(
      mode === "create"
        ? data?.invoice_template?.terms?.[0]
        : {
            _id: data?.invoice_template?.terms?.[0]?._id,
            name: data?.invoice_template?.terms?.[0]?.name,
            content: termsValue,
          }
    );
    editModal.onOpen();
  };

  const handleEditNotes = () => {
    setType("notes");
    setSelectedItem(
      mode === "create"
        ? data?.invoice_template?.notes?.[0]
        : {
            _id: data?.invoice_template?.notes?.[0]?._id,
            name: data?.invoice_template?.notes?.[0]?.name,
            content: notesValue,
          }
    );
    editModal.onOpen();
  };

  return (
    <>
      <div className="space-y-3 md:max-w-[400px]">
        <div className="flex w-full" />

        {/* Terms and Conditions Section */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Terms and Conditions</span>
          <div className="hover:bg-default-100 p-1 rounded-full">
            {!isLoading && (
              <button onClick={handleEditNotes}>
                <EditPenIcon
                  className="text-default-500 cursor-pointer"
                  height={16}
                  width={16}
                />
              </button>
            )}
          </div>
        </div>

        <ReactQuill
          readOnly
          className="border rounded-lg h-[120px]"
          formats={formats}
          modules={modules}
          theme="bubble"
          value={termsValue || ""}
        />

        {/* Notes Section */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Notes</span>
          <div className="hover:bg-default-100 p-1 rounded-full">
            {!isLoading && (
              <button onClick={handleEditNotes}>
                <EditPenIcon
                  className="text-default-500 cursor-pointer"
                  height={16}
                  width={16}
                />
              </button>
            )}
          </div>
        </div>

        <ReactQuill
          readOnly
          className="border rounded-lg h-[120px]"
          formats={formats}
          modules={modules}
          theme="bubble"
          value={notesValue || ""}
        />
      </div>

      {/* {editModal.isOpen ? (
                <EditTermsNotesModal
                    documentId={data?.invoice_template?._id}
                    isOpen={editModal.isOpen}
                    mode={mode}
                    selectedItem={selectedItem}
                    type={type}
                    onClose={editModal.onClose}
                />
            ) : null} */}
    </>
  );
}

export default TermsAndConditions;
