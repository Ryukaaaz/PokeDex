<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\ExpansionSet;
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
        $expansionSet= expansionSet::with('cards')->findOrFail($expansionSetId);
        //using the eloquent relationship
        return Inertia::render('Card/index', [
            'cards' => $expansionSet->cards,
        ]);
    }
}
