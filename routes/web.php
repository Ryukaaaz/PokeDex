<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpansionSetController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\RarityController;
use App\Http\Controllers\GradeController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    //staff
    Route::get('/dashboard', function () {
        return Inertia\Inertia::render('dashboard/index');
    })->name('dashboard');



    //admin
    Route::middleware('admin')->group(function () {
        //expansion set routes
        Route::get('/expansion-sets', [ExpansionSetController::class, 'index'])->name('expansion.index');


        //cards routes
        Route::get('/cards/show/{expansionSetId}', [CardController::class, 'index'])->name('cards.index')->whereNumber('expansionSetId');
        //create new card
        Route::get('/cards/create/{expansionSetId}', [CardController::class, 'create'])->name('cards.create');
        Route::post('/cards/store', [CardController::class, 'store'])->name('cards.store');
        //update new card
        Route::get('/cards/edit/{cardId}', [CardController::class, 'edit'])->name('cards.edit');
        Route::patch('/cards/update/{cardId}', [CardController::class, 'patch'])->name('cards.update');


        //rarity routes
        Route::get('/rarity', [RarityController::class, 'index'])->name('rarity.index');

        //grade routes
        Route::get('/grade', [GradeController::class, 'index'])->name('grade.index');
    });
});

require __DIR__ . '/settings.php';
