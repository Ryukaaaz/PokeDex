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
        $purchase = Purchase::with('purchase_items')->get();
        return Inertia::render('Purchase/index', [
            'purchase' => $purchase,
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
