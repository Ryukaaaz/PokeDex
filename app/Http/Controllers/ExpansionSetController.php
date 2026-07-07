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
    public function index(Request $request): Response
    {
        //
        // @dd(ExpansionSet::all());
        // $request = $request->name;
        // @dd($request);

        $query = ExpansionSet::query();

        if ($request->filled('series')) {
            $query->where('series', $request->series);
        }

        if ($request->filled('name')) {
            $query->where('name', $request->name);
        }

        $expansionSets = $query->get();
        $allExpansionSets = ExpansionSet::all();

        return Inertia::render('ExpansionSet/index', [
            //filtered result
            'expansionSets' => $expansionSets,
            //all result
            'allExpansionSets' => $allExpansionSets,

            //send back the search
            'filters' => $request->only([
                'series',
                'name',
            ]),

        ]);
    }
}
