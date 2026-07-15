<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Grade;
use App\Models\Inventory;
use App\Models\Purchase;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseController extends Controller
{
    //
    public function index(): Response
    {
        //get the data
        $purchases = Purchase::with(
            'purchase_items.card',
            'purchase_items.grade'
        )->get();
        $purchases = $purchases->map(function ($purchase) {
            return [
                'id' => $purchase->id,
                'purchase_date' => $purchase->purchase_date,
                'notes' => $purchase->notes,
                'items' => $purchase->purchase_items->map(function ($item) {
                    return [
                        'purchase_id' => $item->purchase_id,
                        'card' => [
                            'id' => $item->card->id,
                            'name' => $item->card->name,
                        ],
                        'grade' => [
                            'id' => $item->grade->id,
                            'name' => $item->grade->name,
                        ],
                        'quantity' => $item->quantity,
                        'unit_cost' => $item->unit_cost,
                    ];
                }),
            ];
        })->values();
        // dd($purchases->first());

        return Inertia::render('Purchase/index', [
            'purchases' => $purchases,
        ]);
    }

    public function show(): Response
    {

        //get the data
        $grade = Grade::all();
        $card = Card::with('expansionSet')->get();
        //render
        return Inertia::render('Purchase/create', [
            'grade' => $grade,
            'cards' => $card,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        //validate
        $validated = $request->validate([
            'purchase_date' => ['required', 'date'],
            'notes' => ['nullable', 'string', 'min:5', 'max:255'],

            'items.*.card_id' => ['required', 'integer'],
            'items.*.grade_id' => ['required', 'integer'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.unit_cost' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($validated) {

            //store to purchase table
            $purchase = Purchase::create([
                'purchase_date' => $validated['purchase_date'],
                'notes' => $validated['notes'] ?? null,
            ]);

            //store to purchase_items table
            foreach ($validated['items'] as $item) {
                $purchase->purchase_items()->create($item);
                //increase the stock at inventory table if not found then create new
                $inventory = Inventory::firstOrCreate(
                    [
                        'card_id' => $item['card_id'],
                        'grade_id' => $item['grade_id'],
                    ],
                    [
                        'quantity' => 0,
                        'asking_price' => ceil($item['unit_cost'] + ($item['unit_cost'] * 0.30)),
                    ],
                );
                //increase the inventory quantity based on the card_id and grade_id
                $inventory->increment('quantity', $item['quantity']);
            }
        });

        // dd($request);
        return redirect()->route('purchase.index');
    }
}
