<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpansionSetController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\RarityController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\PurchaseController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    //staff
    Route::get('/dashboard', function () {
        return Inertia\Inertia::render('dashboard/index');
    })->name('dashboard');

    //inventory
    Route::get('/inventory', [InventoryController::class,'index'])->name('inventory.index');

    //purchase
    Route::get('/purchase',[PurchaseController::class,'index'])->name('purchase.index');
    //purchase create
    Route::get('/purchase/create',[PurchaseController::class,'show'])->name('purchase.create');
    Route::post('/purchase/create',[PurchaseController::class,'store'])->name('purchase.store');

    //admin
    Route::middleware('admin')->group(function () {
        //expansion set routes
        Route::get('/expansion-sets', [ExpansionSetController::class, 'index'])->name('expansion.index');

        //admin expansion
        Route::get('/admin-expansion',[ExpansionSetController::class,'admin_index'])->name('admin_expansion.index');
        //admin expansion create
        Route::post('/admin-expansion/create',[ExpansionSetController::class,'admin_create'])->name('admin_expansion.create');
        //admin expansion update
        Route::patch('/admin-expansion/update/{expansionId}',[ExpansionSetController::class,'admin_patch'])->name('admin_expansion.update');
        //admin expansion delete
        Route::delete('/admin-expansion/delete/{expansionId}',[ExpansionSetController::class,'admin_delete'])->name('admin_expansion.delete');

        //cards routes
        Route::get('/cards/show/{expansionSetId}', [CardController::class, 'index'])->name('cards.index')->whereNumber('expansionSetId');
        //create new card
        Route::get('/cards/create/{expansionSetId}', [CardController::class, 'create'])->name('cards.create');
        Route::post('/cards/store', [CardController::class, 'store'])->name('cards.store');
        //update card
        Route::get('/cards/edit/{cardId}', [CardController::class, 'edit'])->name('cards.edit');
        Route::patch('/cards/update/{cardId}', [CardController::class, 'patch'])->name('cards.update');


        //rarity routes
        Route::get('/rarity', [RarityController::class, 'index'])->name('rarity.index');
        //create rarity
        Route::post('/rarity/create',[RarityController::class,'create'])->name('rarity.create');
        //update rarity
        Route::patch('/rarity/update/{rarityId}',[RarityController::class,'patch'])->name('rarity.update');

        //grade routes
        Route::get('/grade', [GradeController::class, 'index'])->name('grade.index');
        //create grade
        Route::post('/grade/create',[GradeController::class,'store'])->name('grade.create');
        // update grade
        Route::patch('/grade/update/{gradeId}',[GradeController::class,'patch'])->name('grade.update');
    });
});

require __DIR__ . '/settings.php';
