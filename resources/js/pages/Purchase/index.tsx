import { Head, router, useForm } from '@inertiajs/react';
import { index as PurchaseIndex } from '@/routes/purchase';
import { create as PurchaseCreate } from '@/routes/purchase';
import React from 'react';
index.layout = {
    breadcrumbs: [
        {
            title: 'Purchase',
            href: PurchaseIndex(),
        },
    ],
};

type Purchase = {
    id: number,
    purchase_id: number,
    card_name: string,
    grade_name: string,
    quantity: number,
    unit_price: number,
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
                <button className='btn btn-primary mt-4 mb-4' onClick={()=> router.visit(PurchaseCreate().url)}>
                    + Create New Purchase
                </button>
                <table className='table'>
                    <thead>
                        <th>ID</th>
                        <th>Purchase ID</th>
                        <th>Card</th>
                        <th>Grade</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                        <th>Purchase Date</th>
                        <th>Notes</th>
                    </thead>
                    <tbody>
                        <tr>
                            <th>test</th>
                            <th>test</th>
                            <th>test</th>
                            <th>test</th>
                            <th>test</th>
                            <th>test</th>
                            <th>test</th>
                            <th>test</th>
                            <th>test</th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    );
}


