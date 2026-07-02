<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpansionSetController;
use App\Http\Controllers\CardController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia\Inertia::render('dashboard/index');
    })->name('dashboard');
    //expansion set routes
    Route::get('/expansion-sets',[ExpansionSetController::class, 'index'])->name('expansion.index');


    //cards routes
    Route::get('/cards/{expansionSetId}',[CardController::class,'index'])->name('cards.index');
});

require __DIR__.'/settings.php';
