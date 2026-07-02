import { Head,Link } from '@inertiajs/react';
// import { Link } from 'lucide-react';

Index.layout = {
    breadcrumbs: [
        {
            title: 'Expansion Sets',
            href: '/expansion-sets',
        },
    ],
};

type Expansion = {
    id: number;
    name: string;
    code: string;
    series: string;
    release_date: string;
    language: string;
    total: number;
    printed_total: number;
};

type Props = {
    expansionSets: Expansion[];
}



export default function Index({ expansionSets }: Props) {
    return (
        <>
            <Head title="Expansion Sets" />
            {/* <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"> */}
            <h2 className="text-2xl font-bold p-4">{expansionSets.length} expansion sets found.</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 overflow-y-hidden rounded-xl p-4">
                {expansionSets.map((expansion) => (
                    <Link
                        key={expansion.id}
                        href={`/cards/${expansion.id}`}>
                        <div className="card bg-base-100 w-96 shadow-sm transition hover:shadow-xl hover:-translate-y-1 duration-300">
                            <figure className="relative">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Shoes" />

                                <div className="badge badge-secondary absolute top-3 right-3 px-4 py-2 text-sm font-semibold">
                                    {expansion.language}
                                </div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-series">{expansion.name}</h2>
                                <h2 className="release-date"> Release Date : {expansion.release_date}</h2>
                                <h2 className="release-date"> Code : {expansion.code}</h2>
                                {/* <p>A card component has a figure, a body part, and inside body there are title and actions parts</p> */}
                                <div className="card-actions justify-end">
                                    <div>
                                        <p>Total Cards:</p>
                                        <button className="btn btn-primary">{expansion.printed_total}/{expansion.total}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Link>


                ))}

            </div>
        </>
    );
}
