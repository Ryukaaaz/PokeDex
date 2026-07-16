import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { store as SaleStore } from "@/routes/sale";
import { create as SaleCreate } from "@/routes/sale";
import CardPickerModal from "./components/CardPickerModal";
import FormInput from "@/components/form/FormInput";


Create.layout = {
    breadcrumbs: [
        {
            title: 'Create New Purchase',
            href: SaleCreate(),
        },
    ],
};

type Inventory = {
    id: number;
    quantity: number;
    asking_price: number;

    card: {
        id: number;
        name: string;
        card_number: string;

        expansion_set: {
            id: number;
            name: string;
            series: string;
        };
    };

    grade: {
        id: number;
        name: string;
    };
};

type Props = {
    inventories: Inventory[];
}

function Create({
    inventories
}: Props) {

    const createForm = useForm({
        sale_date: '',
        notes: '',
        items: [] as {
            inventory_id: number,
            quantity: number,
            discount: number,
            unit_price: number,
        }[],
    })

    const [openCardModal, setOpenCardModal] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState<Inventory[]>([]);

    function submitForm(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (createForm.processing) return;

        createForm.post(SaleStore().url);
    }
    return (
        <>
            <Head title="Create New Sale" />
            <div className="overflow-x-auto p-4">
                <h2 className="text-2xl font-bold p-4">Create New Sale</h2>
                <form onSubmit={submitForm} className="max-w-full space-y-4 p-4">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setOpenCardModal(true)}>
                        + Add Items
                    </button>
                    <div className="overflow-x-auto mt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Card Name</th>
                                    <th>Expansion Set</th>
                                    <th>Grade</th>
                                    <th>Quantity</th>
                                    <th>Discount (%)</th>
                                    <th>Unit Price</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedInventory.map((inventory, index) => (
                                    <tr key={inventory.id}>
                                        <td>{inventory.card.name}</td>
                                        <td>{inventory.card.expansion_set.name}</td>
                                        <td>{inventory.grade.name}</td>

                                        {/* quantity input */}
                                        <td>
                                            <FormInput
                                                label=''
                                                type='text'
                                                value={createForm.data.items[index].quantity}
                                                onChange={(e) => {
                                                    const raw = Number(e.target.value);
                                                    const items = [...createForm.data.items];

                                                    items[index].quantity = Math.min(raw,selectedInventory[index].quantity);

                                                    createForm.setData("items", items);
                                                }}
                                                error={createForm.errors[`items.${index}.quantity`]}
                                            />
                                        </td>

                                        {/* discount input */}
                                        <td>
                                            <FormInput
                                                label=""
                                                type="text"
                                                value={createForm.data.items[index].discount}
                                                onChange={(e) => {
                                                    const raw = Number(e.target.value.replace(/\D/g, ""));
                                                    const items = [...createForm.data.items];

                                                    items[index].discount = Math.min(raw, 100);

                                                    createForm.setData("items", items);
                                                }}
                                                error={createForm.errors[`items.${index}.discount`]}
                                            />
                                        </td>

                                        {/* unit price */}
                                        <td>
                                            <FormInput
                                                label=""
                                                type="text"
                                                value={
                                                    createForm.data.items[index].unit_price
                                                        ? createForm.data.items[index].unit_price.toLocaleString("id-ID")
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    const raw = Number(e.target.value.replace(/\D/g, ""));
                                                    const items = [...createForm.data.items];

                                                    items[index].unit_price = Math.min(raw, selectedInventory[index].asking_price);

                                                    createForm.setData("items", items);
                                                }}
                                                error={createForm.errors[`items.${index}.unit_price`]}
                                            />
                                        </td>

                                        {/* total */}
                                        <td>
                                            {(
                                                //unit price * (1-(discount/100)) * quantity
                                                //(1-(discount/100)) -> example 20% then 20/100 (0.2) subtract 1 with 0.2 to get the actual value to be times with unit price then quantity
                                                createForm.data.items[index].unit_price *
                                                (1 - createForm.data.items[index].discount / 100) *
                                                createForm.data.items[index].quantity
                                            ).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>

                                        {/* remove button */}
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-error btn-sm"
                                                onClick={() => {

                                                    setSelectedInventory(prev =>
                                                        prev.filter((_, i) => i !== index)
                                                    );

                                                    createForm.setData(
                                                        "items",
                                                        createForm.data.items.filter((_, i) => i !== index)
                                                    );
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <FormInput
                        label='Sale Date'
                        type='date'
                        value={createForm.data.sale_date}
                        onChange={(e) =>
                            createForm.setData("sale_date", e.target.value)
                        }
                        error={createForm.errors.sale_date}
                    />
                    <FormInput
                        label='Note'
                        type='textarea'
                        value={createForm.data.notes}
                        onChange={(e) =>
                            createForm.setData("notes", e.target.value)
                        }
                        error={createForm.errors.notes}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={createForm.processing}
                    >
                        {createForm.processing && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        {createForm.processing ? "Saving..." : "Create"}
                    </button>
                </form>
            </div>

            <CardPickerModal
                open={openCardModal}
                inventories={inventories}
                selectedInventory={selectedInventory}
                onClose={() => setOpenCardModal(false)}
                onSelect={(inventory) => {
                    if (
                        createForm.data.items.some(
                            item => item.inventory_id === inventory.id
                        )
                    ) {
                        return;
                    }

                    setSelectedInventory(prev => [...prev, inventory]);

                    createForm.setData("items", [
                        ...createForm.data.items,
                        {
                            inventory_id: inventory.id,
                            quantity: 1,
                            discount: 0,
                            unit_price: inventory.asking_price,
                        },
                    ]);
                }}
            />
        </>
    );
}

export default Create;