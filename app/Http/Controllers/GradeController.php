<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\Request;
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
}
