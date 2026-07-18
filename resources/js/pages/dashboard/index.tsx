import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes'; 
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

type Purchase = {
    purchase_date: string,
    card: string,
    grade: string,
    quantity: number,
    unit_cost: number,
    expansionSet: string,
    created_by: string,
}

type Sale = {
    sale_date: string,
    created_by: string,
    card: string,
    expansionSet: string,
    grade: string,
    quantity: number,
    discount: number,
    unit_price: number,
}

type PurchaseChart = {
    date: string,
    total: number,
}
type SaleChart = {
    date: string,
    total: number,
}

type LowStock = {
    id: number;
    quantity: number;
    card: {
        id: number;
        name: string;
        expansion_set: {
            id: number;
            name: string;
        };
    };
    grade: {
        id: number;
        name: string;
    };
};

type Props = {
    purchases: Purchase[],
    sales: Sale[],
    purchaseChart: PurchaseChart[],
    saleChart: SaleChart[],
    totalPurchase: number,
    totalSale: number,
    revenueToday: number,
    profitToday: number,
    inventoryValue: number,
    lowStock: LowStock[],
}

export default function Dashboard({
    purchases,
    sales,
    totalPurchase,
    totalSale,
    purchaseChart,
    saleChart,
    revenueToday,
    profitToday,
    inventoryValue,
    lowStock,
}: Props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="p-6 space-y-6">

                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-base-content/70">
                        Welcome back! Here's today's business summary.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <p className="text-sm text-base-content/60">
                                Purchased Today
                            </p>

                            <div className="mt-3">
                                {totalPurchase === 0 ? (
                                    <span className="text-center py-8 text-gray-500">
                                        No purchase have been made today !
                                    </span>
                                ) : (
                                    <span className="text-3xl font-bold">
                                        {totalPurchase}
                                    </span>
                                )}

                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <p className="text-sm text-base-content/60">
                                Sold Today
                            </p>

                            <div className="mt-3">
                                {totalSale === 0 ? (
                                    <span className="text-center py-8 text-gray-500">
                                        No sale have been made today !
                                    </span>
                                ) : (
                                    <span className="text-3xl font-bold">
                                        {totalSale}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <p className="text-sm text-base-content/60">
                                Revenue Today
                            </p>

                            <div className="mt-3">
                                {revenueToday === 0 ? (
                                    <span className="text-center py-8 text-gray-500">
                                        No revenue have been made today !
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-base text-base-content/60">Rp</span>
                                        <span className="ml-1 text-2xl font-bold text-success">
                                            {(revenueToday).toLocaleString("id-ID")}
                                        </span>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <p className="text-sm text-base-content/60">
                                Profit Today
                            </p>

                            <div className="mt-3">
                                {profitToday === 0 ? (
                                    <span className="text-center py-8 text-gray-500">
                                        No profit have been made today !
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-base text-base-content/60">Rp</span>
                                        <span className="ml-1 text-2xl font-bold text-primary">
                                            {(profitToday).toLocaleString("id-ID")}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">
                                Purchases (Last 7 Days)
                            </h2>

                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={purchaseChart}>
                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(value) =>
                                                new Date(value).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }
                                        />

                                        <YAxis allowDecimals={false} />

                                        <Tooltip
                                            labelFormatter={(value) =>
                                                new Date(value).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="total"
                                            stroke="#2563eb"
                                            strokeWidth={3}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">
                                Sales (Last 7 Days)
                            </h2>

                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={saleChart}>
                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(value) =>
                                                new Date(value).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }
                                        />

                                        <YAxis allowDecimals={false} />

                                        <Tooltip
                                            labelFormatter={(value) =>
                                                new Date(value).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="total"
                                            stroke="#2563eb"
                                            strokeWidth={3}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Tables */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">

                            <h2 className="card-title">
                                Latest Purchases
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Card</th>
                                            <th>Expansion Set</th>
                                            <th>Grade</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                            <th>Made by</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {purchases.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                                    No purchases found !
                                                </td>
                                            </tr>
                                        ) : (
                                            purchases.map((purchase, index) => (
                                                <tr key={index}>
                                                    <td>{purchase.card}</td>
                                                    <td>{purchase.expansionSet}</td>
                                                    <td>{purchase.grade}</td>
                                                    <td>{purchase.quantity}</td>
                                                    <td>
                                                        {(purchase.unit_cost * purchase.quantity).toLocaleString(
                                                            "id-ID",
                                                            {
                                                                style: "currency",
                                                                currency: "IDR",
                                                            }
                                                        )}
                                                    </td>
                                                    <td>{purchase.created_by}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">

                            <h2 className="card-title">
                                Latest Sales
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Card</th>
                                            <th>Expansion Set</th>
                                            <th>Grade</th>
                                            <th>Qty</th>
                                            <th>Discount</th>
                                            <th>Cost (after discounted)</th>
                                            <th>Created By</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sales.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                                    No sales found !
                                                </td>
                                            </tr>
                                        ) : (
                                            sales.map((sale, index) => (
                                                <tr key={index}>
                                                    <td>{sale.card}</td>
                                                    <td>{sale.expansionSet}</td>
                                                    <td>{sale.grade}</td>
                                                    <td>{sale.quantity}</td>
                                                    <td>{sale.discount} %</td>
                                                    <td>{(sale.unit_price * sale.quantity).toLocaleString(
                                                        "id-ID",
                                                        {
                                                            style: 'currency',
                                                            currency: "IDR",
                                                        }
                                                    )}</td>
                                                    <td>{sale.created_by}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">

                            <h2 className="card-title">
                                Low Stock Alert
                            </h2>

                            <div className="space-y-3">
                                {lowStock.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`alert ${item.quantity <= 1
                                            ? "alert-error"
                                            : "alert-warning"
                                            }`}
                                    >
                                        {item.card.name}
                                        {" - "}
                                        {item.card.expansion_set.name}
                                        {" ("}
                                        {item.grade.name}
                                        {") — Stock: "}
                                        {item.quantity}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">

                            <h2 className="card-title">
                                Inventory Value
                            </h2>

                            <div className="flex flex-col justify-center h-full">
                                {inventoryValue === 0 ? (
                                    <span>
                                        Currently inventory have no value, make some purchases !
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-sm text-base-content/60">
                                            Current Inventory Value
                                        </span>

                                        <span className="text-4xl font-bold text-success">
                                            {(inventoryValue).toLocaleString("id-ID", {
                                                style: 'currency',
                                                currency: 'IDR',
                                            })}
                                        </span></>
                                )}
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
