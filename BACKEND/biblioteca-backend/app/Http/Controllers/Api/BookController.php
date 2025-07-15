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
    // Validar todos los campos
    $request->validate([
        'titulo' => 'required|string',
        'autor' => 'required|string',
        'descripcion' => 'nullable|string',
        'año' => 'nullable|integer',
        'isbn' => 'nullable|string',
        'imagen' => 'nullable|string',
        'categories' => 'nullable|array', // Debe ser un array si viene
        'categories.*' => 'integer|exists:categories,id' // Cada categoría debe existir
    ]);

    // Crear el libro
    $book = Book::create($request->only([
        'titulo',
        'autor',
        'descripcion',
        'año',
        'isbn',
        'imagen'
    ]));

    // Si mandaste categorías, asociarlas
    if ($request->has('categories')) {
        $book->categories()->sync($request->categories);
    }

    // Devolver el libro con las categorías ya relacionadas
    return response()->json($book->load('categories'), 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return $book;
        //mostrar libro especifico
    }

    public function update(Request $request, Book $book)
{
    $request->validate([
        'titulo' => 'nullable|string',
        'autor' => 'nullable|string',
        'descripcion' => 'nullable|string',
        'año' => 'nullable|integer',
        'isbn' => 'nullable|string',
        'imagen' => 'nullable|string',
        'category_ids' => 'nullable|array',
        'category_ids.*' => 'integer|exists:categories,id',
    ]);

    // Actualiza los campos normales
    $book->update($request->only([
        'titulo',
        'descripcion',
        'autor',
        'año',
        'isbn',
        'imagen'
    ]));

    // Si el request trae category_ids, sincronizamos
    if ($request->has('category_ids')) {
        $book->categories()->sync($request->input('category_ids'));
    }

    // Retorna el libro con sus categorías actualizadas
    return $book->load('categories');
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

    
    public function byCategory($category)
{
    $books = \App\Models\Book::whereHas('categories', function($query) use ($category) {
        $query->where('name', $category);
    })
    ->with(['categories'])
    ->get()
    ->sortBy(function($book) use ($category) {
        foreach ($book->categories as $cat) {
            if ($cat->name === $category) {
                return $cat->pivot->position;
            }
        }
        return 999; // por si acaso
    })
    ->values();

    return $books;
}

}
