<?php

namespace App\Http\Controllers;

use App\Models\Rarity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RarityController extends Controller
{
    //
    public function index(): Response
    {

        //get the data
        $rarities = Rarity::all();
        return Inertia::render('Rarity/index', [
            'rarities' => $rarities,
        ]);
    }

    public function patch(Request $request, int $rarityId): RedirectResponse
    {
        // @dd($rarityId);
        //validate
        // @dd($request->code, $request->name);
        $validate = $request->validate([
            'name' => ['required','string','min:5','max:255'],
            'code' => ['required','string','min:1','max:6'],
        ]);
        
        $rarity = Rarity::findOrFail($rarityId);

        $rarity->update([
            'name' => $validate['name'],
            'code' => $validate['code'],
        ]);

        return redirect()->route('rarity.index')->with('success','Rarity updated Successfuly!');
    }
}
