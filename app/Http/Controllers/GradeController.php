<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    //
    public function index(){

        //get the data
        $grade = Grade::all();
        return Inertia::render('Grade/index',[
            'grades' => $grade,
        ]);
    }
}
