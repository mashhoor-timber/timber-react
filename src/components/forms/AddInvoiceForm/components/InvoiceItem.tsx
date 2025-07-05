import { CSSProperties } from "react";

import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "@components/atomic/Button";
import Input from "@components/atomic/Input";
import Select, { SelectItem } from "@components/atomic/Select";

import { NewInvoiceItem } from "../types";

import InvoiceItemTitle from "./InvoiceItemTitle";
import DragIcon from "@assets/icons/DragIcon";
import MinusIcon from "@assets/icons/MinusIcon";

type Props = {
  id: string;
  index: number;
  items: NewInvoiceItem[];
  onRemove: (index: number) => void;
  vats: any;
};

function InvoiceItem({ id, index, items, onRemove, vats }: Props) {
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    animateLayoutChanges,
  });

  const style = {
    transform: CSS.Transform.toString(
      transform
        ? {
            ...transform,
            x: 0,
          }
        : null
    ),
    transition,
    display: "flex",
    alignItems: "stretch",
    backgroundColor: isDragging ? "#f5f5f5" : "#ffffff",
    position: (isDragging ? "relative" : "inherit") as "relative" | "inherit",
    zIndex: isDragging ? 1000 : 0,
    padding: "6px 0",
    borderRadius: "12px",
    transformOrigin: "left",
  };

  const iconStyle: CSSProperties = {
    padding: "0 8px",
    cursor: "grab",
    alignSelf: "stretch",
    display: "flex",
    alignItems: "start",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} style={iconStyle}>
        <DragIcon
          className="text-default-500 hover:text-default-700 rotate-90 mt-3"
          height={18}
          width={18}
        />
      </div>
      <div className="flex-grow grid grid-cols-8 gap-2 content-center">
        <div className="col-span-3">
          <InvoiceItemTitle index={index} />
        </div>
        <div className="col-span-1">
          <Input
            isRequired
            errorMessage=""
            label=""
            min={0}
            name={`items[${index}].quantity`}
            placeholder="Quantity"
            type="number"
          />
        </div>
        <div className="col-span-1">
          <Input
            isRequired
            errorMessage=""
            label=""
            min={0}
            name={`items[${index}].rate`}
            placeholder="Price"
            type="number"
          />
        </div>
        <div className="col-span-1">
          <Select 
            color="white"
            errorMessage=""
            label=""
            name={`items[${index}].vat`}
            placeholder=""
            popoverProps={{
              style: {
                minWidth: "150px",
              },
            }}
          >
            {vats?.map((vat: any, i: number) => (
              <SelectItem
                key={vat.percentage}
                description={vat.name}
                textValue={vat.percentage.toString()}
                value={vat.percentage}
              >
                <div className="w-[100px] truncate">{`${vat.percentage}%`}</div>
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="col-span-1">
          <Input
            errorMessage=""
            label=""
            min={0}
            name={`items[${index}].discount`}
            placeholder="Discount"
            type="number"
          />
        </div>
        <div className="col-span-1">
          <Input
            disabled
            errorMessage=""
            label=""
            name={`items[${index}].total`}
            placeholder="Amount"
            type="number"
          />
        </div>
      </div>
      <button
        className={`w-8 min-w-8 text-danger border-none disabled:text-default-500 hover:text-danger flex items-center justify-center ${
          isDragging ? "opacity-0" : ""
        }`}
        color="transparent"
        disabled={items.length === 1}
        onClick={() => onRemove(index)}
      >
        <MinusIcon height={16} width={16} />
      </button>
    </div>
  );
}

export default InvoiceItem;
