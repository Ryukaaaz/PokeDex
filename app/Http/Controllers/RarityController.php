<?php

namespace App\Http\Controllers;

use App\Models\Rarity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RarityController extends Controller
{
    //
    public function index(): Response{

        //get the data
        $rarities = Rarity::all();
        return Inertia::render('Rarity/index',[
            'rarities' => $rarities,
        ]);
    }
}
