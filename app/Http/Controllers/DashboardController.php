<?php

namespace App\Http\Controllers;
use App\Services\DashboardService;
use App\Models\Purchase_item;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    //

    public function index(DashboardService $dashboard): Response
    {
        $profit = $dashboard->revenueToday() - $dashboard->totalPurchaseToday();
        return Inertia::render('dashboard/index', [
            'purchases' => $dashboard->purchasesLatest(),
            'sales' => $dashboard->salesLatest(),
            'totalPurchase' => $dashboard->purchaseToday(),
            'purchaseChart' => $dashboard->purchaseChart(),
            'saleChart' => $dashboard->saleChart(),
            'totalSale' => $dashboard->saleToday(),
            'revenueToday' => $dashboard->revenueToday(),
            'profitToday' => $profit,
            'inventoryValue' => $dashboard->inventoryValue(),
            'lowStock' => $dashboard->lowStock(),
        ]);
    }
}
