<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Sale;
use App\Models\Sale_item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class SaleController extends Controller
{
    //
    public function index(): Response
    {
        //get the data
        $sales = Sale::with(
            [
                'sale_item.inventory.card.expansionSet',
                'sale_item.inventory.grade',
            ]
        )->get();
        $sales = $sales->map(function (Sale $sale) {
            return [
                'id' => $sale->id,
                'sale_date' => $sale->sale_date,
                'notes' => $sale->notes,
                'items' => $sale->sale_item->map(function (Sale_item $item) {
                    return [
                        'sale_id' => $item->sale_id,
                        'card' => [
                            'id' => $item->inventory->card->id,
                            'name' => $item->inventory->card->name,
                        ],
                        'grade' => [
                            'id' => $item->inventory->grade->id,
                            'name' => $item->inventory->grade->name,
                        ],
                        'quantity' => $item->quantity,
                        'discount' => $item->discount,
                        'unit_price' => $item->unit_price,
                    ];
                }),
                'total' => $sale->sale_item->map(fn(Sale_item $item) => $item->quantity * $item->unit_price)->sum(),
            ];
        })->sortByDesc('id')->values();
        return Inertia::render('Sale/index', [
            'sales' => $sales,
        ]);
    }

    public function show(): Response
    {
        //get the data
        $inventory = Inventory::with([
            'card.expansionSet',
            'grade'
        ])->where('quantity', '>', 0)->get();
        //render
        return Inertia::render('Sale/create', [
            'inventories' => $inventory,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {

        //validate
        $validated = $request->validate([
            'sale_date' => ['required', 'date'],
            'notes' => ['nullable', 'string', 'min:5', 'max:255'],

            'items.*.inventory_id' => ['required', 'integer'],
            'items.*.quantity' => ['required', 'integer'],
            'items.*.discount' => ['required', 'integer'],
            'items.*.unit_price' => ['required', 'integer'],

        ]);
        // dd($request);
        //store
        DB::transaction(function () use ($validated) {

            //store to sale table
            $sale = Sale::create([
                'sale_date' => $validated['sale_date'],
                'notes' => $validated['notes'] ?? null,
            ]);

            //store to sale_item table
            foreach ($validated['items'] as $item) {

                //decrement the stock from inventory
                $inventory = Inventory::findOrFail($item['inventory_id']);
                //validate the stock so cannot be minus
                if ($inventory->quantity < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'items.$index.quantity' => 'Insuffcient stock'
                    ]);
                }
                // Calculate the discounted unit price
                $item['unit_price'] = (int) round(
                    $item['unit_price'] * (1 - $item['discount'] / 100)
                );
                $sale->sale_item()->create($item);
                $inventory->decrement('quantity', $item['quantity']);
            }
        });

        //return
        return redirect()->route('sale.index');
    }
}
