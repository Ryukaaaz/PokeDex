<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\Purchase;
use App\Models\Purchase_item;
use App\Models\Sale;
use App\Models\Sale_item;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function purchaseToday(): int
    {
        $query = Purchase::query();

        if (Auth::user()->role !== 'admin') {
            $query->where('created_by', Auth::id());
        }

        return $query
            ->whereDate('purchase_date', today())
            ->count();
    }

    public function saleToday(): int
    {
        $query = Sale::query();

        if (Auth::user()->role !== 'admin') {
            $query->where('created_by', Auth::id());
        }

        return $query
            ->whereDate('sale_date', today())
            ->count();
    }

    public function revenueToday(): int
    {
        $query = Sale_item::with(
            'sale',
        );

        if (Auth::user()->role !== 'admin') {
            $query->whereHas('sale', function ($query) {
                $query->where('created_by', Auth::id());
            });
        }

        return (int) $query
            ->whereDate('created_at', today())
            ->sum(DB::raw('unit_price * quantity'));
    }

    public function totalPurchaseToday(): int
    {
        $query = Purchase_item::with(
            'purchase',
        );

        if (Auth::user()->role !== 'admin') {
            $query->whereHas('purchase', function ($query) {
                $query->where('created_by', Auth::id());
            });
        }

        return (int) $query
            ->whereDate('created_at', today())
            ->sum(DB::raw('unit_cost * quantity'));
    }

    public function inventoryValue(): int
    {
        $query = Inventory::query();

        return (int) $query
            ->sum(DB::raw('asking_price * quantity'));
    }

    public function purchaseChart(): array
    {
        $query = Purchase::query();

        if (Auth::user()->role !== 'admin') {
            $query->where('created_by', Auth::id());
        }

        $data = $query
            ->whereDate('purchase_date', '>=', now()->subDays(6))
            ->select(
                'purchase_date',
                DB::raw('COUNT(*) as total')
            )
            ->groupBy('purchase_date')
            ->pluck('total', 'purchase_date');

        $chart = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i)->toDateString();

            $chart[] = [
                'date' => $date,
                'total' => $data[$date] ?? 0,
            ];
        }
        return $chart;
    }

    public function saleChart(): array
    {
        $query = Sale::query();

        if (Auth::user()->role !== 'admin') {
            $query->where('created_by', Auth::id());
        }

        $data = $query
            ->whereDate('sale_date', '>=', now()->subDays(6))
            ->select(
                'sale_date',
                DB::raw('COUNT(*) as total')
            )
            ->groupBy('sale_date')
            ->pluck('total', 'sale_date');

        $chart = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i)->toDateString();

            $chart[] = [
                'date' => $date,
                'total' => $data[$date] ?? 0,
            ];
        }
        return $chart;
    }

    public function purchasesLatest(int $limit = 2): array
    {
        //get lastest purchase items
        $query = Purchase_item::with(
            'card.expansionSet',
            'grade',
            'purchase.user',
        );

        if (Auth::user()->role !== 'admin') {
            $query->whereHas('purchase', function ($query) {
                $query->where('created_by', Auth::id());
            });
        }

        return $query
            ->orderByDesc('created_at')
            ->take($limit)
            ->get()
            ->map(function (Purchase_item  $item) {
                return [
                    'purchase_date' => $item->purchase->purchase_date,
                    'created_by' => $item->purchase->user->name,
                    'card' => $item->card->name,
                    'expansionSet' => $item->card->expansionSet->name,
                    'grade' => $item->grade->name,
                    'quantity' => $item->quantity,
                    'unit_cost' => $item->unit_cost,
                ];
            })
            ->toArray();
    }

    public function salesLatest(int $limit = 2): array
    {
        $query = Sale_item::with(
            'sale.user',
            'inventory.card.expansionSet',
            'inventory.grade',
        );

        if (Auth::user()->role !== 'admin') {
            $query->whereHas('sale', function ($query) {
                $query->where('created_by', Auth::id());
            });
        }

        return $query
            ->orderByDesc('created_at')
            ->take($limit)
            ->get()
            ->map(function (Sale_item $item) {
                return [
                    'sale_date' => $item->sale->sale_date,
                    'created_by' => $item->sale->user->name,
                    'card' => $item->inventory->card->name,
                    'expansionSet' => $item->inventory->card->expansionSet->name,
                    'grade' => $item->inventory->grade->name,
                    'quantity' => $item->quantity,
                    'discount' => $item->discount,
                    'unit_price' => $item->unit_price,
                ];
            })
            ->toArray();
    }

    public function lowStock(int $threshold = 5)
    {
        $query = Inventory::with(['card.expansionSet', 'grade']);

        return $query
            ->where('quantity', '<=', $threshold)
            ->orderBy('quantity')
            ->get();
    }
}
