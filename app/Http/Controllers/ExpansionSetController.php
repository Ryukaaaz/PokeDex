<?php

namespace App\Http\Controllers;

use App\Models\ExpansionSet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpansionSetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // @dd(ExpansionSet::all());
        return Inertia::render('ExpansionSet/index',[
            'expansionSets' =>ExpansionSet::all()
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
    public function show(ExpansionSet $expansionSet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExpansionSet $expansionSet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExpansionSet $expansionSet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExpansionSet $expansionSet)
    {
        //
    }
}
