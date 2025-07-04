import { useCallback, useEffect } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { useDebouncedCallback } from 'use-debounce';

import Input from "@components/atomic/Input";

import { CreateInvoiceValues, NewInvoiceItem } from "../types";

function truncateDec(num: number) {
  return Math.trunc(num * 100) / 100;
}

export default function Totals() {
  const { setValue, control } = useFormContext<CreateInvoiceValues>();
  const { items, shipping, amount_paid, title, isTitleChanged } = useWatch({
    control,
  });
  const calculateItemsTotal = useCallback((item: NewInvoiceItem) => {
    const quantity = item.quantity || 0;
    const rate = item.rate || 0;
    const vat = item.vat || 0;
    const discount = item.discount || 0;
    const itemTotal = quantity * rate;
    const vatTotal = (itemTotal * vat) / 100;
    const discountTotal = (itemTotal * discount) / 100;
    const total = itemTotal + vatTotal - discountTotal;
    return { itemTotal, vatTotal, discountTotal, total };
  }, []);

  const findTotals = useDebouncedCallback(() => {
    if (!items || items.length === 0) return;
    let subTotalFinal = 0;
    let vatTotalFinal = 0;
    let discountTotalFinal = 0;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item && item.rate && item.quantity) {
        const { itemTotal, vatTotal, discountTotal, total } =
          calculateItemsTotal(item as NewInvoiceItem);
        subTotalFinal += itemTotal;
        vatTotalFinal += vatTotal;
        discountTotalFinal += discountTotal;
        setValue(`items[${i}].total` as any, truncateDec(total));
      }

      // const subTotalString = subTotalFinal.toFixed(2);
      // const vatTotalString = vatTotalFinal.toFixed(2);
      // const discountTotalString = discountTotalFinal.toFixed(2);
      const overallTotal = subTotalFinal + vatTotalFinal - discountTotalFinal;
      const amountDue = overallTotal + Number(shipping) - (amount_paid || 0);

      setValue("sub_total", truncateDec(subTotalFinal));
      setValue("vat_total", truncateDec(vatTotalFinal));
      setValue("discount_total", truncateDec(discountTotalFinal));
      setValue("total", truncateDec(overallTotal));
      setValue("amount_due", truncateDec(amountDue));
    }
  }, 200);

  useEffect(() => {
    findTotals();
  }, [items, shipping, amount_paid, title, isTitleChanged, findTotals]);

  return (
    <div className="space-y-3 mt-14 w-full md:max-w-[320px] justify-self-end">
      <Input
        disabled
        textEnd
        label=""
        name="sub_total"
        placeholder="Sub Total"
        startContent={
          <span className="whitespace-nowrap text-default-500 text-sm">
            Sub Total:
          </span>
        }
        type="number"
      />

      <Input
        disabled
        textEnd
        label=""
        name="vat_total"
        placeholder="VAT"
        startContent={
          <span className="whitespace-nowrap text-default-500 text-sm">
            VAT:
          </span>
        }
        type="number"
      />

      <Input
        disabled
        textEnd
        label=""
        name="discount_total"
        placeholder="Discount"
        startContent={
          <span className="whitespace-nowrap text-default-500 text-sm">
            Discount:
          </span>
        }
        type="number"
      />

      <Input
        textEnd
        label=""
        min={0}
        name="shipping"
        placeholder="Shipping"
        startContent={
          <span className="whitespace-nowrap text-default-800 text-sm">
            Shipping:
          </span>
        }
        type="number"
      />

      <Input
        disabled
        textEnd
        label=""
        name="total"
        placeholder="Total"
        startContent={
          <span className="whitespace-nowrap text-default-500 text-sm">
            Total:
          </span>
        }
        type="number"
      />

      {/* <Input
                isRequired
                textEnd
                label=""
                min={0}
                name="amount_paid"
                placeholder="Amount Paid"
                startContent={
                    <span className="whitespace-nowrap text-default-800 text-sm">Amount Paid:</span>
                }
                type="number"
            /> */}

      {/* <Input
                disabled
                textEnd
                label=""
                name="amount_due"
                placeholder="Amount Due"
                startContent={
                    <span className="whitespace-nowrap text-default-500 text-sm">Amount Due:</span>
                }
                type="number"
            /> */}
    </div>
  );
}
