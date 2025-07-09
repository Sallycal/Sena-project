<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\AuthController;

//Ruta para registro
Route::post('/register', [AuthController::class, 'register']);

//Ruta para login
Route::post('/login', [AuthController::class, 'login']);

Route::get('/books', [BookController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/books/{book}', [BookController::class, 'show']);

    Route::middleware('admin')->group(function () {
        Route::post('/books', [BookController::class, 'store']);
        Route::put('/books/{book}', [BookController::class, 'update']);
        Route::delete('/books/{book}', [BookController::class, 'destroy']);
    });

        });