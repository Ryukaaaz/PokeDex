<?php

namespace App\Http\Controllers;

use App\Models\Rarity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RarityController extends Controller
{
    //
    public function index(){

        //get the data
        $rarities = Rarity::all();
        return Inertia::render('Rarity/index',[
            'rarities' => $rarities,
        ]);
    }
}
