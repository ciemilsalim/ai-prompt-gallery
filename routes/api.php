<?php

use App\Http\Controllers\Api\PromptIngestController;
use App\Http\Controllers\PromptController;
use Illuminate\Support\Facades\Route;

Route::post('/track-copy/{id}', [PromptController::class, 'trackCopy'])->name('api.track-copy');
Route::post('/v1/prompts', [PromptIngestController::class, 'store'])->name('api.v1.prompts.store');
