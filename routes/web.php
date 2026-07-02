<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpansionSetController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia\Inertia::render('dashboard/index');
    })->name('dashboard');
    Route::get('/expansion-sets',[ExpansionSetController::class, 'index'])->name('expansion.index');
});

require __DIR__.'/settings.php';
