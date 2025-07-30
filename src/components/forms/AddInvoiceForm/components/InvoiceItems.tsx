import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Spacer } from '@heroui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Button from '@components/atomic/Button';
import InvoiceItem from './InvoiceItem';
import { NewInvoiceItem } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useTimberClient } from '@providers/TimberProvider';

export default function InvoiceItems() {
    const { control } = useFormContext();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'items',
    });

    const timberClient = useTimberClient();
    const { data: vats } = useQuery({
        queryKey: ['getTaxRates'],
        queryFn: () => timberClient.taxRate.list(),
        select: (res: any) => res.data.data,
        enabled: !!timberClient,
    });

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = fields.findIndex(item => item.id === active.id);
            const newIndex = fields.findIndex(item => item.id === over.id);
            move(oldIndex, newIndex);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="text-md font-semibold">Items</span>
                <div className="flex gap-4">
                    {/* <Button as={Link} color="text" href="/invoices/items" size="md">
                        Saved Items
                    </Button> */}
                    <Button
                        className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-primary hover:text-white"
                        color="white"
                        size="md"
                        onClick={() =>
                            append({
                                id: uuidv4(),
                                title: '',
                                quantity: 1,
                                rate: '',
                                vat: 5,
                                discount: 0,
                                total: 0.0,
                            })
                        }
                    >
                        Add an item
                    </Button>
                </div>
            </div>

            <Spacer y={3} />

            <div className="flex gap-2 bg-secondary text-white rounded-xl py-3">
                <div className="w-8" />
                <div className="flex-grow grid grid-cols-8 gap-2">
                    <span className="text-sm font-medium col-span-3">Title</span>
                    <span className="text-sm font-medium">Quantity</span>
                    <span className="text-sm font-medium">Price</span>
                    <span className="text-sm font-medium">VAT (%)</span>
                    <span className="text-sm font-medium">Discount (%)</span>
                    <span className="text-sm font-medium">Amount</span>
                </div>
                <div className="w-8" />
            </div>

            <Spacer y={2} />

            {/* <DndContext
                collisionDetection={closestCenter}
                measuring={{
                    droppable: { strategy: MeasuringStrategy.Always },
                }}
                modifiers={[restrictToFirstScrollableAncestor]}
                sensors={sensors}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={fields} strategy={verticalListSortingStrategy}> */}
            <div>
                {fields.map((item, index) => (
                    <InvoiceItem
                        key={item.id}
                        id={item.id}
                        index={index}
                        items={fields as NewInvoiceItem[]}
                        vats={vats || []}
                        onRemove={() => remove(index)}
                    />
                ))}
            </div>
            {/* </SortableContext>
            // </DndContext> */}

            {/* <div className="ms-10">
                <Button
                    disableRipple
                    className="border-0 gap-0 p-0 text-default-500 hover:text-foreground"
                    color="transparent"
                    size="fit"
                    startContent={<PlusIcon height={16} width={16} />}
                    onClick={() =>
                        append({
                            id: uuidv4(),
                            title: '',
                            quantity: 1,
                            rate: '',
                            vat: 5,
                            discount: 0,
                            total: 0.0,
                        })
                    }
                >
                    <span className="ms-1 italic">Add an item</span>
                </Button>
            </div> */}
        </div>
    );
}
