<?php

namespace App\Http\Controllers;

use App\Models\ExpansionSet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $expansionSetId): Response
    {
        // $card = Card::where('expansion_set_id',$expansionSetId)->get();
        $expansionSet = expansionSet::with([
            'cards.rarity',
            'cards.grade',
        ])->findOrFail($expansionSetId);
        // @dd($expansionSet->cards);
        //using the eloquent relationship
        return Inertia::render('Card/index', [
            'cards' => $expansionSet->cards,
            'expansionSetName' => $expansionSet->name,
            'expansionSetSeries' => $expansionSet->series,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Card/create');
    }

    public function store(Request $request): RedirectResponse
    {
        @dd($request);
        // validate

        // store

        // return view
        return redirect()->route('cards.index');
    }
}
