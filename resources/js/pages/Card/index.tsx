import { Head } from '@inertiajs/react';
import { useState } from 'react';

Index.layout = {
    breadcrumbs: [
        {
            title: 'Card',
            href: '/cards',
        },
    ],
};

type Card = {
    id: number;
    name: string;
    card_number: number;
    rarity: string;
    grade: string;
    expansion_set_id: number;
};

type Props = {
    cards: Card[];
}



export default function Index({ cards }: Props) {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    return (
        <>
            <Head title="Expansion Sets" />
            {/* <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"> */}
            <h2 className="text-2xl font-bold p-4">{cards.length} cards found.</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 overflow-y-hidden rounded-xl p-4">
                {cards.map((card) => (

                    <div key={card.id} className="hover-3d" onClick={() => setSelectedCard(card)}>
                        {/* <!-- content --> */}
                        <figure className="w-60 rounded-2xl">
                            <img src="https://img.daisyui.com/images/stock/card-1.webp?x" alt={card.name} />
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

                                <img
                                    src="https://img.daisyui.com/images/stock/card-1.webp?x"
                                    alt={selectedCard.name}
                                    className="w-72 rounded-2xl shadow-2xl transition hover:scale-105 duration-300"
                                />

                            </div>

                            {/* Right Side */}
                            <div className="p-8 flex flex-col">

                                {/* Header */}
                                <div>
                                    <h1 className="text-4xl font-extrabold">
                                        {selectedCard.name}
                                    </h1>

                                    <p className="text-base-content/60 mt-2">
                                        Scarlet & Violet • White Flare
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
                                            {selectedCard.expansion_set_id}
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
                                            {selectedCard.rarity}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-base-content/70">
                                            Grade
                                        </span>

                                        <span>
                                            {selectedCard.grade}
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
                                {/* <div className="modal-action mt-auto">

                                    <button className="btn btn-primary">
                                        Add to Trade
                                    </button>

                                    <button className="btn btn-secondary">
                                        Edit
                                    </button>

                                    <button
                                        className="btn"
                                        onClick={() => setSelectedCard(null)}
                                    >
                                        Close
                                    </button>

                                </div> */}

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
