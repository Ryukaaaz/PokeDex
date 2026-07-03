import { Head } from '@inertiajs/react';
import { index as RarityIndex } from '@/routes/rarity'
Index.layout = {
    breadcrumbs: [
        {
            title: 'Rarity',
            href: RarityIndex(),
        },
    ],
};

type Rarity = {
    id: number;
    code: string;
    name: string;
};

type Props = {
    rarities: Rarity[];
}

export default function Index({ rarities }: Props) {
    return (
        <>
            <Head title="Rarity pages" />
            <div className="overflow-x-auto p-4">
                <h1>List Of Rarity</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Code</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rarities.map((rarity) => {
                            return (
                                <tr className="hover:bg-base-300">
                                    <th>{rarity.id}</th>
                                    <td>{rarity.code}</td>
                                    <td>{rarity.name}</td>
                                </tr>

                            );
                        })}
                    </tbody>
                </table>
            </div>

        </>
    );
}
