import { useMemo, useState } from "react";
import FormInput from "@/components/form/FormInput";

type Card = {
    id: number;
    name: string;
    card_number: string;
    expansion_set: {
        id: number;
        name: string;
        series: string;
    };
};

type Props = {
    open: boolean;
    cards: Card[];
    onClose: () => void;
    onSelect: (card: Card) => void;
};

export default function CardPickerModal({
    open,
    cards,
    onClose,
    onSelect,
}: Props) {
    const [search, setSearch] = useState("");

    const filteredCards = useMemo(() => {
        return cards.filter((card) =>
            card.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [cards, search]);

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
                                <th>ID</th>
                                <th>Card</th>
                                <th>Expansion</th>
                                <th>Series</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCards.map((card) => (
                                <tr key={card.id}>
                                    <td>{card.id}</td>
                                    <td>{card.name}</td>
                                    <td>{card.expansion_set.name}</td>
                                    <td>{card.expansion_set.series}</td>

                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                onSelect(card);
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