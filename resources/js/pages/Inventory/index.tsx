import { Head, router, useForm } from "@inertiajs/react";
import FormSelect from "@/components/form/FormSelect";
import { index as InventoryIndex } from '@/routes/inventory'
Index.layout = {
    breadcrumbs: [
        {
            title: 'Inventory Page',
            href: InventoryIndex(),
        }
    ]
}

type Inventory = {
    id: number,
    card_id: number,
    grade_id: number,
    quantity: number,
    card_number: number,
    card_name: string,
    expansion_set_name: string,
    grade_name: string,
    asking_price: number,
    unit_cost: number,
}

type allInventory = {
    expansion_set_name: string;
    card_name: string;
}

type Props = {
    inventories: Inventory[];
    allInventories: allInventory[];
    filters: {
        expansion: string;
        card: string;
    }
}


export default function Index({
    inventories,
    allInventories,
    filters: InitialFilters,
}: Props) {

    const filters = useForm({
        expansion: InitialFilters.expansion ?? '',
        card: InitialFilters.card ?? '',
    })

    function submitSearch(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        router.get('/inventory', {
            expansion: filters.data.expansion ?? '',
            card: filters.data.card ?? '',
        })
    }

    //filtered expansion options
    const expansionOptions = [
        ...new Set(allInventories.map((inventory) => inventory.expansion_set_name)),
    ].map((name) => ({
        value: name,
        label: name,
    }))
    //filtered card options
    const cardOptions = allInventories.filter((inventory) => {
        if (!filters.data.expansion) {
return true;
}

        return inventory.expansion_set_name === filters.data.expansion;
    }).map((inventory) => ({
        value: inventory.card_name,
        label: inventory.card_name,
    }))


    return (
        <>
            <Head title='Inventory'></Head>
            <h2 className="text-2xl font-bold p-4">Inventory</h2>

            {/* Search Bar */}
            <div className="p-4">
                <form className="flex gap-4 items-end" onSubmit={submitSearch}>
                    <FormSelect
                        label='Expansion'
                        value={filters.data.expansion}
                        onChange={(e) => {
                            filters.setData('expansion', e.target.value);
                            filters.setData('card', '');
                        }}
                        options={expansionOptions}
                        error={filters.errors.expansion}
                    />
                    <FormSelect
                        label='Card Name'
                        value={filters.data.card}
                        onChange={(e) => {
                            filters.setData('card', e.target.value);
                        }}
                        options={cardOptions}
                        error={filters.errors.card}
                    />
                    <button className="btn btn-primary">
                        Search
                    </button>
                </form>
            </div>

            {/* Content */}
            <div className="overflow-x-auto p-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Inventory Id</th>
                            <th>Expansion Name</th>
                            <th>Card Name</th>
                            <th>Card Number</th>
                            <th>Grade</th>
                            <th>Quantity</th>
                            <th>Unit Cost</th>
                            <th>Listing Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventories.map((inventory) => {
                            return (
                                <tr key={inventory.id} className="hover:bg-base-300">
                                    <th>{inventory.id}</th>
                                    <th>{inventory.expansion_set_name}</th>
                                    <th>{inventory.card_name}</th>
                                    <th>{inventory.card_number}</th>
                                    <th>{inventory.grade_name}</th>
                                    <th>{inventory.quantity}</th>
                                    <th>
                                        {(inventory.unit_cost ?? 0).toLocaleString('id-ID',{
                                            style: 'currency',
                                            currency: 'IDR',
                                        })}
                                    </th>
                                    <th>
                                        {(inventory.asking_price ?? 0).toLocaleString('id-ID',{
                                            style: 'currency',
                                            currency: 'IDR',
                                        })}
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}