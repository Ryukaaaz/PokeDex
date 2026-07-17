import { useMemo, useState } from "react";
import FormInput from "@/components/form/FormInput";

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
    open: boolean;
    inventories: Inventory[];
    selectedInventory: Inventory[];
    onClose: () => void;
    onSelect: (inventory: Inventory) => void;
};

export default function CardPickerModal({
    open,
    inventories,
    selectedInventory,
    onClose,
    onSelect,
}: Props) {
    const [search, setSearch] = useState("");

    const filteredInventory = useMemo(() => {
        return inventories.filter((inventory) => {
            const matchesSearch =
                inventory.card.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const alreadySelected = selectedInventory.some(
                (selected) => selected.id === inventory.id
            );

            return matchesSearch && !alreadySelected;
        });
    }, [inventories, selectedInventory, search]);

    if (!open) {
        return null;
    }

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-5xl">

                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">
                        Select Card
                    </h3>

                    <button
                        className="btn btn-sm btn-circle"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="divider"></div>

                <FormInput
                    label="Search Card"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="overflow-x-auto mt-5 max-h-96">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Card Name</th>
                                <th>Expansion</th>
                                <th>Grade</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredInventory.map((inventory) => (
                                <tr key={inventory.id}>
                                    <td>{inventory.card.name}</td>
                                    <td>{inventory.card.expansion_set.name}</td>
                                    <td>{inventory.grade.name}</td>
                                    <td>{inventory.quantity}</td>
                                    <td>
                                        {inventory.asking_price !== null
                                            ? inventory.asking_price.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })
                                            : "-"}
                                    </td>


                                    <td></td>

                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                onSelect(inventory);
                                                onClose();
                                            }}
                                        >
                                            Select
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}