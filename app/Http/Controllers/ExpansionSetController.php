<?php

namespace App\Http\Controllers;

use App\Models\ExpansionSet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExpansionSetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //
        // @dd(ExpansionSet::all());
        return Inertia::render('ExpansionSet/index',[
            'expansionSets' =>ExpansionSet::all()
        ]);
    }
}
