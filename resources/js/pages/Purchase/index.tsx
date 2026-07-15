import { Head, router } from '@inertiajs/react';
import { index as PurchaseIndex } from '@/routes/purchase';
import { create as PurchaseCreate } from '@/routes/purchase';
index.layout = {
    breadcrumbs: [
        {
            title: 'Purchase',
            href: PurchaseIndex(),
        },
    ],
};
type Purchase_items = {
    purchase_id: number,
    card: {
        id: number,
        name: string,
    }
    grade: {
        id: number,
        name: string,
    }
    quantity: number,
    unit_cost: number,
}

type Purchase = {
    id: number,
    purchase_date: string,
    notes: string | null,
    items: Purchase_items[]
}

type Props = {
    purchases: Purchase[];
}

export default function index({
    purchases
}: Props) {
    return (
        <>
            <Head title="Purchase" />
            <div className="overflow-x-auto p-4">
                <h1 className='text text-xl bold'>Purchase History</h1>
                <button className='btn btn-primary mt-4 mb-4' onClick={() => router.visit(PurchaseCreate().url)}>
                    + Create New Purchase
                </button>
                {purchases.map((purchase) => (
                    <div key={purchase.id} className="card bg-base-100 shadow mb-6">

                        {/* Purchase Header */}
                        <div className="card-body">
                            <h2 className="card-title">
                                Purchase #{purchase.id}
                            </h2>

                            <p>Date: {purchase.purchase_date}</p>
                            <p>Notes: {purchase.notes ?? "-"}</p>

                            <div className="overflow-x-auto mt-4">

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Card</th>
                                            <th>Grade</th>
                                            <th>Qty</th>
                                            <th>Unit Cost</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {purchase.items.map((item) => (
                                            <tr key={`${item.card.id}-${item.grade.id}`}>
                                                <td>{item.card.name}</td>
                                                <td>{item.grade.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{(item.unit_cost ?? 0).toLocaleString('id-ID',{
                                                    style: 'currency',
                                                    currency: 'IDR',

                                                })}</td>
                                                <td>{(item.quantity * item.unit_cost).toLocaleString('id-ID',{
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                })}</td>
                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </>
    );
}


