import { Head, router } from "@inertiajs/react";
import { index as SaleIndex } from "@/routes/sale";
import { create as SaleCreate } from "@/routes/sale";

index.layout = {
    breadcrumbs: [
        {
            title: 'Sale',
            href: SaleIndex(),
        },
    ],
};
type Sale_items = {
    sale_id: number,
    card: {
        id: number,
        name: string,
    }
    grade: {
        id: number,
        name: string,
    }
    quantity: number,
    discount: number,
    unit_price: number,
}

type Sale = {
    id: number,
    sale_date: string,
    notes: string | null,
    created_by: string,
    items: Sale_items[],
    total: number,
}

type Props = {
    sales: Sale[];
}

export default function index({
    sales
}: Props) {
    return (
        <>
            <Head title="Sale" />
            <div className="overflow-x-auto p-4">
                <h1 className='text text-xl bold'>Sale History</h1>
                <button className='btn btn-primary mt-4 mb-4' onClick={() => router.visit(SaleCreate().url)}>
                    + Create New Sale
                </button>

                {sales.map((sale) => (
                    <div key={sale.id} className="card bg-base-100 shadow mb-6">

                        {/* sale Header */}
                        <div className="card-body">
                            <h2 className="card-title">
                                sale #{sale.id}
                            </h2>

                            <p>Date: {sale.sale_date}</p>
                            <p>Notes: {sale.notes ?? "-"}</p>
                            <p>Created By: {sale.created_by ?? "-"}</p>

                            <div className="overflow-x-auto mt-4">

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Card</th>
                                            <th>Grade</th>
                                            <th>Qty</th>
                                            <th>Discount</th>
                                            <th>Unit Price (After Discounted)</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {sale.items.map((item) => (
                                            <tr key={`${item.card.id}-${item.grade.id}`}>
                                                <td>{item.card.name}</td>
                                                <td>{item.grade.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.discount}%</td>
                                                <td>{(item.unit_price ?? 0).toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',

                                                })}</td>
                                                <td>{(item.quantity * item.unit_price).toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                })}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5} className='text-right font-bold'> Total :</td>
                                            <td className='text-right font-bold'>{(sale.total).toLocaleString('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                            })}</td>

                                        </tr>
                                    </tfoot>

                                </table>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}