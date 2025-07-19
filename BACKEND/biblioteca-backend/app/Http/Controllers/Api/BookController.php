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
        $books = Book::where('activo', true)->get();
         return response()->json($books);
        //listar todos los libros

    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request)
{
    // Validar todos los campos
    $validated = $request->validate([
        'titulo' => 'required|string',
        'autor' => 'required|string',
        'descripcion' => 'nullable|string',
        'año' => 'nullable|integer',
        'isbn' => 'nullable|string',
        'imagen' => 'nullable|string',
        'categories' => 'nullable|array', 
        'categories.*' => 'integer|exists:categories,id' 
    ]);

    // Crear el libro
    $book = Book::create($validated);

    // Si mandaste categorías, asociarlas con posición
    if (!empty($validated['categories'])) {
        $categoriesWithPositions = [];
        foreach (array_values($validated['categories']) as $index => $categoryId) {
            $categoriesWithPositions[$categoryId] = ['position' => $index + 1];
        }
        $book->categories()->sync($categoriesWithPositions);
    }

    return response()->json($book->load('categories'), 201);
}

    /**
     * Display the specified resource.
     */
   public function show($id)
{
    $book = Book::find($id);

    if (!$book || !$book->activo) {
        return response()->json(['message' => 'Libro no encontrado o ha sido eliminado.'], 404);
    }

    return response()->json($book);
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

    // Si se mandan categorías, sincronizarlas con posición
    if ($request->has('category_ids')) {
        $categories = $request->input('category_ids');

        // Preparamos un array con la posición
        $syncData = [];
        foreach ($categories as $index => $categoryId) {
            $syncData[$categoryId] = ['position' => $index + 1];
        }

        $book->categories()->sync($syncData);
    }


    // Retorna el libro con sus categorías actualizadas
    return response()->json($book->load('categories'));
}

    /**
     * Remove the specified resource from storage.
     */
  public function destroy($id)
{
    try {
        $book = Book::findOrFail($id);
        $book->activo = false;
        $book->save();

        return response()->json(['message' => 'Libro eliminado'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al eliminar el libro', 'details' => $e->getMessage()], 500);
    }
}

 public function byCategory($categoryId)
{
    $books = \App\Models\Book::where('activo', true) 
        ->whereHas('categories', function($query) use ($categoryId) {
            $query->where('categories.id', $categoryId);
        })

    ->with(['categories'])
    ->get()
    ->sortBy(function($book) use ($categoryId) {
        foreach ($book->categories as $cat) {
            if ($cat->id == $categoryId) {
                return $cat->pivot->position;
            }
        }
        return 999; // En caso de que no tenga esa categoría
    })
    ->values();

    return response()->json($books);
}
}