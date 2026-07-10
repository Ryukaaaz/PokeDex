<?php

namespace App\Http\Controllers;

use App\Models\ExpansionSet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
    public function admin_index(Request $request): Response
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

        return Inertia::render('ExpansionSet/admin-index', [
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

    public function admin_create(Request $request): RedirectResponse
    {
        //validate
        // @dd($request);
        $validate = $request->validate([
            'code' => ['required', 'string', 'min:2', 'max:255'],
            'series' => ['required', 'string', 'min:2', 'max:255'],
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
                Rule::unique('expansion_sets')
                    ->where(fn($query) => $query->where('series', $request->series))
            ],
            'release_date' => ['required', 'date'],
            'printed_total' => ['required', 'integer'],
            'total' => ['required', 'integer'],
            'language' => ['required', 'string', 'min:2', 'max:5'],
        ]);

        //store
        ExpansionSet::create([
            'code' => $validate['code'],
            'series' => $validate['series'],
            'name' => $validate['name'],
            'release_date' => $validate['release_date'],
            'printed_total' => $validate['printed_total'],
            'total' => $validate['total'],
            'language' => $validate['language'],
        ]);

        //return
        return redirect()->route('admin_expansion.index');
    }

    public function admin_patch(Request $request, int $expansionId): RedirectResponse
    {
        // @dd($request,$expansionId);
        // validate
        $validate = $request->validate([
            'code' => ['required', 'string', 'min:2', 'max:255'],
            'series' => ['required', 'string', 'min:5', 'max:255'],
            'name' => [
                'required',
                'string',
                'min:5',
                'max:255',
                Rule::unique('expansion_sets')->where(
                    fn($query) => $query->where('series', $request->series)
                )->ignore($expansionId)
            ],
            'release_date' => ['required', 'date'],
        ]);
        // patch
        $expansion = ExpansionSet::findOrFail($expansionId);
        $expansion->update([
            'code' => $validate['code'],
            'series' => $validate['series'],
            'name' => $validate['name'],
            'release_date' => $validate['release_date'],
        ]);

        //return
        return redirect()->route('admin_expansion.index');
    }

    public function admin_delete(int $expansionId): RedirectResponse
    {

        //delete
        $expansion = ExpansionSet::findOrFail($expansionId);
        // @dd($expansionId);
        $expansion->delete();


        return redirect()->route('admin_expansion.index');
    }
}
