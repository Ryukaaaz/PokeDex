<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\ExpansionSet;
use App\Models\Grade;
use App\Models\Rarity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
            'expansionSetId' => $expansionSet->id,
            'expansionSetName' => $expansionSet->name,
            'expansionSetSeries' => $expansionSet->series,
        ]);
    }

    public function create(int $expansionSetId): Response
    {
        $rarity = Rarity::all();
        $grade = Grade::all();

        return Inertia::render('Card/create', [
            'expansion_set_id' => $expansionSetId,
            'rarities' => $rarity,
            'grades' => $grade,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        // @dd($request);

        // validate
        $validate = $request->validate(
            [
                'expansion_set_id' => ['required', 'integer'],
                'name' => ['required', 'string', 'min:5', 'max:255'],
                'card_number' => [
                    'required',
                    'integer',
                    Rule::unique('cards')->where(
                        fn($query) =>
                        $query->where('expansion_set_id', $request->expansion_set_id)
                    ),
                ],
                'rarity' => ['required', 'integer'],
                'grade' => ['required', 'integer'],
                'image' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:2048']

            ],
            [
                'card_number.unique' => "this card number is already exist in the selected expansion set"
            ]
        );

        $image = $request->file('image');
        // @dd($validate);

        // store
        $path = $image->store('cards', 'public');
        Card::create([
            'expansion_set_id' => $validate['expansion_set_id'],
            'name' => $validate['name'],
            'card_number' => $validate['card_number'],
            'rarity_id' => $validate['rarity'],
            'grade_id' => $validate['grade'],
            'image' => $path,
        ]);
        // return view
        return redirect()->route('cards.index', [
            'expansionSetId' => $validate['expansion_set_id'],
        ]);
    }
}
