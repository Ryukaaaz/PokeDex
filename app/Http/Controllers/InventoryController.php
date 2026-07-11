<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryController extends Controller
{
    //
    public function index(Request $request): Response
    {

        $query = Inventory::with(
            'card.expansionSet',
            'card.grade',
        );

        if ($request->filled('expansion')) {
            $query->whereHas('card.expansionSet', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->expansion . '%');
            });
        }

        if ($request->filled('card')) {
            $query->whereHas('card', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->card . '%');
            });
        }

        //get the data from db
        $inventories = $query->get()->map(function ($inventory) {
            return [
                'id' => $inventory->id,
                'card_id' => $inventory->card_id,
                'grade_id' => $inventory->grade_id,
                'quantity' => $inventory->quantity,
                'card_number' => $inventory->card->card_number,
                'card_name' => $inventory->card->name,
                'expansion_set_name' => $inventory->card->expansionSet->name,
                'grade_name' => $inventory->grade->name,
            ];
        })
        ->sortBy([
            ['expansion_set_name','desc'],
            ['card_name', 'desc'],
        ])->values();

        //for dropdown search
        $allInventories = Card::with('expansionSet')
            ->select('id','name','expansion_set_id')->get()
            ->map(fn($card)=>[
                'card_name' => $card->name,
                'expansion_set_name' => $card->expansionSet->name,
            ]);

        //return
        return Inertia::render(
            'Inventory/index',
            [
                //filtered search
                'inventories' => $inventories,

                //for search drop down
                'allInventories' => $allInventories,

                //send back the search
                'filters' => $request->only([
                    'expansion',
                    'card',
                ]),
            ]
        );
    }
}
