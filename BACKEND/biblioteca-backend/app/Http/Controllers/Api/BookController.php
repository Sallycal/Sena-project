<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Book::all();
        //listar todos los libros

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'autor' => 'required|string',
        ]);

        return Book::create($request->all());
        //crea un libro nuevo
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return $book;
        //mostrar libro especifico
    }

    /**
     * Update the specified resource in storage.
     */ 
     public function update(Request $request, Book $book)
    {
        $book->update($request->all());
        return $book;
        //actualizar libro
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->noContent();
        //eliminar libro
    }
}
