<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\AuthController;

//Ruta para registro
Route::post('/register', [AuthController::class, 'register']);

//Ruta para login
Route::post('/login', [AuthController::class, 'login']);

//Ruta para ver todos los libros
Route::get('/books', [BookController::class, 'index']);

//Ruta de buscador
Route::get('/books/search', [BookController::class, 'search']);

//Ruta que necesitan autenticacion
Route::middleware('auth:sanctum')->group(function () {

    //Ruta de ver un libro especifico
    Route::get('/books/{book}', [BookController::class, 'show']);

    //Ruta que necesitan autenticacion de admin
    Route::middleware('admin')->group(function () {

        //Ruta de añadir o crear libro
        Route::post('/books', [BookController::class, 'store']);

        //Ruta de modificar un libro
        Route::put('/books/{book}', [BookController::class, 'update']);

        //Ruta de eliminar un libro
        Route::delete('/books/{book}', [BookController::class, 'destroy']);
    });

});

//Ruta de ver categoria
Route::get('/books/category/{category}', [BookController::class, 'byCategory']);



