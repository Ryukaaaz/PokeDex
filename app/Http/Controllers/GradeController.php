<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class GradeController extends Controller
{
    //
    public function index(): Response{

        //get the data
        $grade = Grade::all();
        return Inertia::render('Grade/index',[
            'grades' => $grade,
        ]);
    }

    public function store(Request $request):RedirectResponse{
    //validate
    $validate = $request->validate([
        'name' => ['required','string','min:3','max:255', Rule::unique('grades','name')],
    ]);

    //store
    Grade::create([
        'name' => $validate['name'],
    ]);

    //return
    return redirect()->route('grade.index');
    }

    public function patch(Request $request, int $gradeId):RedirectResponse{
    // @dd($request->name,$gradeId); 
    //validate

    $validate = $request->validate([
        'name' => ['required','string','Min:3','Max:255',Rule::unique('grades','name')]
    ]);

    //store
    $grade = Grade::findOrFail($gradeId);

    $grade->update([
        'name' => $validate['name'],
    ]);

    //return view
    return redirect()->route('grade.index');
    }
}
