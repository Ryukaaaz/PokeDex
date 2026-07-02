<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\ExpansionSet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $expansionSetId)
    {
        // $card = Card::where('expansion_set_id',$expansionSetId)->get();
        $expansionSet= expansionSet::with('cards')->findOrFail($expansionSetId);
        //using the eloquent relationship
        return Inertia::render('Card/index', [
            'cards' => $expansionSet->cards,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Card $card)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Card $card)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        //
    }
}
