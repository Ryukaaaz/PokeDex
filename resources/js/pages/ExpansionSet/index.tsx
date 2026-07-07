import { Head, Link, router, useForm } from '@inertiajs/react';
import { index as cardIndex } from '@/routes/cards'
import { useState } from 'react';
import FormSelect from '@/components/form/FormSelect';

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
    allExpansionSets: Expansion[];
    filters: {
        series: string;
        name: string;
    }
}



export default function Index({
    expansionSets,
    allExpansionSets,
    filters: InitialFilters,
}: Props) {
    const [search, setSearch] = useState('');
    const filters = useForm({
        series: InitialFilters.series ?? '',
        name: InitialFilters.name ?? '',
    })

    const seriesOptions = [
        ...new Set(allExpansionSets.map((expansion) => expansion.series)),
    ].map((series) => ({
        value: series,
        label: series
    }))

    const filteredNameOPtions = allExpansionSets.filter((expansion) => {
        if (!filters.data.series) return true;
        return expansion.series === filters.data.series;
    }).map((expansion) => ({
        value: expansion.name,
        label: expansion.name,
    }));

    function submit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        router.get('/expansion-sets', {
            series: filters.data.series ?? '',
            name: filters.data.name ?? '',
        });

        //shorter way
        // router.get('/expansion-sets',filters.data);
    }
    return (
        <>
            <Head title="Cards" />

            <h2 className="text-2xl font-bold p-4">{expansionSets.length} expansion sets found.</h2>



            {/* Search bar */}
            <div className='p-4'>
                <form onSubmit={submit}
                    className='flex gap-4 items-end'>
                    <FormSelect
                        label='series'
                        value={filters.data.series}
                        onChange={(e) => {
                            filters.setData('series', e.target.value);
                            filters.setData('name','');
                        }}
                        options={seriesOptions}
                        error={filters.errors.series}
                    />
                    <FormSelect
                        label='name'
                        value={filters.data.name}
                        onChange={(e) =>
                            filters.setData('name', e.target.value)
                        }
                        options={filteredNameOPtions}
                        error={filters.errors.name}
                    />
                    <button className="btn btn-primary">
                        Search
                    </button>
                </form>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 rounded-xl p-4">
                {expansionSets.map((expansion) => (
                    <Link
                        key={expansion.id}
                        className="block w-full"
                        // href={`/cards/${expansion.id}`}>
                        href={cardIndex(expansion.id)}>
                        <div className="card bg-base-100 w-full shadow-sm transition hover:shadow-xl hover:-translate-y-1 duration-300">
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
