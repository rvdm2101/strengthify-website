<?php

use App\Http\Controllers\ImagesController;
use App\Http\Controllers\MusclesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/muscles', [MusclesController::class, 'index'])->name('muscles.index');
    Route::get('/muscles/new', [MusclesController::class, 'create'])->name('muscles.create');
    Route::post('/muscles/new', [MusclesController::class, 'store'])->name('muscles.store');
    Route::get('/muscles/{id}', [MusclesController::class, 'edit'])->name('muscles.edit');
    Route::patch('/muscles/{id}', [MusclesController::class, 'update'])->name('muscles.update');
});

Route::get('/uploaded-images', [ImagesController::class, 'index'])->name('images.index');
Route::get('/uploaded-images/new', [ImagesController::class, 'create'])->name('images.create');
Route::post('/uploaded-images/new', [ImagesController::class, 'store'])->name('images.store');
Route::delete('/uploaded-images/{id}', [ImagesController::class, 'destroy'])->name('images.destroy');

require __DIR__ . '/auth.php';
