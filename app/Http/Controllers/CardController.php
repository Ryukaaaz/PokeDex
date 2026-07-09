<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\ExpansionSet;
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
        $expansionSet = ExpansionSet::with([
            'cards.rarity',
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

    /**
     * showing create form.
     */

    public function create(int $expansionSetId): Response
    {
        $rarity = Rarity::all();

        return Inertia::render('Card/create', [
            'expansion_set_id' => $expansionSetId,
            'rarities' => $rarity,
        ]);
    }
    /**
     * storing the create form data.
     */
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
            'image' => $path,
        ]);
        // return view
        return redirect()->route('cards.index', [
            'expansionSetId' => $validate['expansion_set_id'],
        ]);
    }
    /**
     * Showing Edit Form.
     */

    public function edit(int $cardId): Response
    {

        $card = Card::with(['rarity'])->findOrFail($cardId);
        // @dd($card);

        // dd($rarityName);
        //for dropdown purposes
        $rarity = Rarity::all();

        $expansionSetId = $card->expansion_set_id;
        // @dd($expansionSetName,$expansionSetSeries);


        //get the selected card data to show.
        return Inertia::render('Card/update', [
            'card' => $card,
            //dropdown purposes
            'rarities' => $rarity,
            'expansionSetId' => $expansionSetId,
        ]);
    }

    /**
     * Storing Value From Edit Form.
     */

    public function patch(Request $request, int $cardId): RedirectResponse
    {
        //get request data
        // @dd($request);

        //validate
        $validate = $request->validate(
            [
                'expansion_set_id' => ['required', 'integer'],
                'name' => ['required', 'string', 'min:5', 'max:255'],
                // 'card_number' => [
                //     'required',
                //     'integer',
                //     Rule::unique('cards')->where(
                //         fn($query) =>
                //         $query->where('expansion_set_id', $request->expansion_set_id)
                //     ),
                // ],
                'rarity' => ['required', 'integer'],

            ]
            // ,
            // [
            //     'card_number.unique' => "this card number is already exist in the selected expansion set"
            // ]
            // ps no need to update the card number since it was readonly
        );
        //search the data
        $card = Card::findOrFail($cardId);
        //update
        $card->update([
            'expansion_set_id' => $validate['expansion_set_id'],
            'name' => $validate['name'],
            // 'card_number' => $validate['card_number'],
            'rarity_id' => $validate['rarity'],
        ]);

        //return view card
        return redirect()->route('cards.index',[
            'expansionSetId' => $validate['expansion_set_id'],
        ]);
    }
}
