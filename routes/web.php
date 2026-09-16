<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PromptController;

Route::get('/', [PromptController::class, 'index'])->name('home');
Route::get('/r/{prompt_slug}', [PromptController::class, 'redirectAffiliate'])->name('prompt.redirect');

use App\Http\Controllers\DashboardController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/prompts', [DashboardController::class, 'store'])->name('dashboard.prompts.store');
    Route::patch('/dashboard/prompts/{prompt}/toggle', [DashboardController::class, 'togglePublish'])->name('dashboard.prompts.toggle');
    Route::delete('/dashboard/prompts/{prompt}', [DashboardController::class, 'destroy'])->name('dashboard.prompts.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
