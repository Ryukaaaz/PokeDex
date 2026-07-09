import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { create as createNewCard } from '@/routes/cards'
import { edit as EditCard } from '@/routes/cards';

Index.layout = {
    breadcrumbs: [
        {
            title: 'Card',
            href: '/cards',
        },
    ],
};

type Rarity = {
    id: number;
    name: string;
};

type Card = {
    id: number;
    name: string;
    card_number: number;
    rarity_id: number;
    expansion_set_id: number;
    rarity: Rarity;
    image: string
};

type Props = {
    cards: Card[];
    expansionSetName: string;
    expansionSetSeries: string;
    expansionSetId: number;
}



export default function Index({ expansionSetId, expansionSetName, expansionSetSeries, cards }: Props) {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    return (
        <>
            <Head title="Cards" />
            {/* <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"> */}
            <h2 className="text-2xl font-bold p-4">{cards.length} Cards Found In {expansionSetName} Expansion Pack</h2>
            <div className='inline-block p-4'>
                <Link className='btn btn-soft btn-info'
                    href={createNewCard(expansionSetId)}>
                    + Insert New Card Found
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 rounded-xl p-4">
                {cards.map((card) => (
                    <div key={card.id} className="hover-3d" onClick={() => setSelectedCard(card)}>
                        {/* <!-- content --> */}
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
                        {/* <!-- 8 empty divs needed for the 3D effect --> */}
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>



                ))}

            </div>
            {/* Modal */}
            {selectedCard && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-5xl p-0 overflow-hidden">

                        <div className="grid md:grid-cols-2">

                            {/* Left Side */}
                            <div className="bg-base-200 flex items-center justify-center p-8">

                                <figure className="w-full h-72 rounded-2xl bg-base-200 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={`/storage/${selectedCard.image}`}
                                        alt={selectedCard.name}
                                        className='w-full h-full object-contain'
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://img.daisyui.com/images/stock/card-1.webp?x";
                                        }}
                                    />
                                </figure>

                            </div>

                            {/* Right Side */}
                            <div className="p-8 flex flex-col">

                                {/* Header */}
                                <div>
                                    <h1 className="text-4xl font-extrabold">
                                        {selectedCard.name}
                                    </h1>

                                    <p className="text-base-content/60 mt-2">
                                        {expansionSetSeries} • {expansionSetName}
                                    </p>
                                </div>

                                <div className="divider"></div>

                                {/* Information */}
                                <div className="space-y-4">

                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-base-content/70">
                                            Expansion
                                        </span>

                                        <span>
                                            {expansionSetName}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-base-content/70">
                                            Card Number
                                        </span>

                                        <span>#{selectedCard.card_number}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-base-content/70">
                                            Rarity
                                        </span>

                                        <span>
                                            {selectedCard.rarity.name}
                                        </span>
                                    </div>

                                </div>

                                <div className="divider"></div>

                                {/* Market Section */}
                                {/* <div className="space-y-3">

                                    <h3 className="font-bold text-lg">
                                        Market Information
                                    </h3>

                                    <div className="stats shadow w-full">

                                        <div className="stat">
                                            <div className="stat-title">
                                                Market Price
                                            </div>

                                            <div className="stat-value text-primary">
                                                Rp150.000
                                            </div>
                                        </div>

                                        <div className="stat">
                                            <div className="stat-title">
                                                Stock
                                            </div>

                                            <div className="stat-value">
                                                5
                                            </div>
                                        </div>

                                    </div>

                                </div> */}

                                {/* Buttons */}
                                <div className="modal-action mt-auto">

                                    <Link className='btn btn-secondary'
                                        href={EditCard(selectedCard.id)}>
                                        Edit Card
                                    </Link>


                                </div>

                            </div>

                        </div>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setSelectedCard(null)}>
                            close
                        </button>
                    </form>
                </dialog>
            )}
        </>
    );
}
