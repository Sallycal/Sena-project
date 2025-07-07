<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí puedes registrar rutas de API para tu aplicación.
| Estas rutas se cargan automáticamente bajo el grupo de middleware "api".
|
*/

// Ruta para los libros
Route::apiResource('books', BookController::class);

// Ruta de ejemplo (puedes eliminarla si no usas autenticación)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});