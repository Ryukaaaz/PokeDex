import { useForm, Head } from '@inertiajs/react';
import { edit as CardEdit } from '@/routes/cards';
import { update as CardUpdate } from '@/routes/cards';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
Index.layout = {
    breadcrumbs: [
        {
            title: 'Edit Card',
            href: CardEdit,
        },
    ],
};

type Card = {
    id: number;
    name: string;
    card_number: number;
    rarity_id: number;
    expansion_set_id: number;
    image: string
};

type Rarity = {
    id: number,
    code: string,
    name: string,
}

type Props = {
    card: Card;
    expansionSetId: number;

    rarities: Rarity[];
}


export default function Index({
    card,
    expansionSetId,
    rarities,

}: Props) {

    const form = useForm({
        expansion_set_id: expansionSetId,
        name: card.name,
        card_number: card.card_number,
        rarity: card.rarity_id,
        image: null as File | null,
    })

    function submit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (form.processing) return;

        form.patch(CardUpdate(card.id).url);
    }

    const rarity_options = rarities.map((rarity) => ({
        value: rarity.id,
        label: rarity.name,
    }))

    return (
        <>
            <Head title="Edit New Card" />
            <form onSubmit={submit} className='max-w-full space-y-4 p-4'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex-1 border'>
                        <figure className="w-full h-72 rounded-2xl bg-base-200 flex items-center justify-center overflow-hidden">
                            <img
                                src={`/storage/${card.image}`}
                                alt={card.name}
                                className='w-full h-full object-contain'
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://img.daisyui.com/images/stock/card-1.webp?x";
                                }}
                            />
                        </figure>

                    </div>
                    <div className='flex-1 border'>

                        <FormInput
                            label='Expansion Id'
                            type="number"
                            value={expansionSetId}
                            onChange={(e) =>
                                form.setData("expansion_set_id", Number(e.target.value))
                            }
                            error={form.errors.expansion_set_id}
                            readOnly
                        />
                        <FormInput
                            label='Card Name'
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                            error={form.errors.name}
                        />
                        <FormInput
                            label='Card Number'
                            type="number"
                            value={form.data.card_number}
                            onChange={(e) =>
                                form.setData("card_number", Number(e.target.value))
                            }
                            error={form.errors.card_number}
                            readOnly
                        />
                        <FormSelect
                            label='Rarity'
                            value={form.data.rarity}
                            onChange={(e) =>
                                form.setData('rarity', Number(e.target.value))
                            }
                            options={rarity_options}
                            error={form.errors.rarity}
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={form.processing}>
                    {form.processing && (
                        <span className='loading loading-spinner loading-sm'></span>
                    )}
                    {form.processing ? "Saving..." : "Update"}
                </button>
            </form>
        </>
    );
}
