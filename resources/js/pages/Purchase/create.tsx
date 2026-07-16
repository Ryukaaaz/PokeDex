import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { create as PurchaseCreate } from '@/routes/purchase';
import { store as PurchaseStore } from '@/routes/purchase';
import CardPickerModal from './components/CardPickerModal';
Create.layout = {
    breadcrumbs: [
        {
            title: 'Create New Purchase',
            href: PurchaseCreate(),
        },
    ],
};

type Grade = {
    id: number,
    name: string,
}

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
    grade: Grade[];
    cards: Card[];
}

function Create({
    grade,
    cards

}: Props) {
    const createForm = useForm({
        purchase_date: '',
        notes: '',
        items: [] as {
            card_id: number,
            grade_id: string,
            quantity: number,
            unit_cost: string,
        }[],
    })

    const [openCardModal, setOpenCardModal] = useState(false);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    //display all grade options
    const gradeOptions = grade.map((grade) => ({
        value: grade.id,
        label: grade.name,
    }))

    function submitForm(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (createForm.processing) {
            return;
        }

        createForm.post(PurchaseStore().url);
    }

    return (
        <>
            <Head title="Create New Purchase" />
            <div className="overflow-x-auto p-4">
                <h2 className='text-2xl font-bold p-4'>Create New Purchase</h2>
                <form onSubmit={submitForm} className='max-w-full space-y-4 p-4'>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setOpenCardModal(true)}
                    >
                        + Add Card
                    </button>
                    <div className="overflow-x-auto mt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Card</th>
                                    <th>Grade</th>
                                    <th>Quantity</th>
                                    <th>Unit Cost</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {selectedCards.map((card, index) => (

                                    <tr key={card.id}>
                                        {/* displaying card id and name */}
                                        <td>
                                            {card.card_number} - {card.name}
                                        </td>
                                        {/* displaying grade */}
                                        <td>
                                            <FormSelect
                                                label='Grade'
                                                value={createForm.data.items[index].grade_id}
                                                options={gradeOptions}
                                                onChange={(e) => {
                                                    const items = [...createForm.data.items];

                                                    items[index].grade_id = e.target.value;

                                                    createForm.setData("items", items);
                                                }}
                                                error={createForm.errors[`items.${index}.grade_id`]}
                                            />
                                        </td>
                                        {/* displaying qty */}
                                        <td>
                                            <FormInput
                                                label='Quantity'
                                                type='text'
                                                value={createForm.data.items[index].quantity}
                                                onChange={(e) => {
                                                    const items = [...createForm.data.items];

                                                    items[index].quantity = Number(e.target.value);

                                                    createForm.setData("items", items);
                                                }}
                                                error={createForm.errors[`items.${index}.quantity`]}
                                            />
                                        </td>
                                        {/* displaying unit cost */}
                                        <td>
                                            <FormInput
                                                label='Cost'
                                                type='text'
                                                value={
                                                    createForm.data.items[index].unit_cost
                                                        ? new Intl.NumberFormat("id-ID").format(
                                                            Number(createForm.data.items[index].unit_cost)
                                                        )
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    const raw = e.target.value.replace(/\D/g, "");
                                                    const items = [...createForm.data.items];

                                                    items[index].unit_cost = raw;

                                                    createForm.setData("items", items);
                                                }}
                                                error={createForm.errors[`items.${index}.unit_cost`]}
                                            />
                                        </td>
                                        {/* remove button */}
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-error btn-sm"
                                                onClick={() => {

                                                    setSelectedCards(prev =>
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
                        label='Purchase Date'
                        type='date'
                        value={createForm.data.purchase_date}
                        onChange={(e) =>
                            createForm.setData("purchase_date", e.target.value)
                        }
                        error={createForm.errors.purchase_date}
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
                        type='submit'
                        className='btn btn-primary'
                        disabled={createForm.processing}>
                        {createForm.processing && (
                            <span className='loading loading-spinner loading-sm'></span>
                        )}
                        {createForm.processing ? "Saving..." : "Create"}
                    </button>
                </form>
            </div>

            <CardPickerModal
                open={openCardModal}
                cards={cards}
                onClose={() => setOpenCardModal(false)}
                onSelect={(card) => {
                    setSelectedCards((prev) => [...prev, card]);

                    createForm.setData("items", [
                        ...createForm.data.items,
                        {
                            card_id: card.id,
                            grade_id: '',
                            quantity: 1,
                            unit_cost: '',
                        },
                    ]);
                }}
            />

        </>
    );
}

export default Create;
