<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use App\Http\Resources\ListBookResource;
use App\Http\Resources\CategoryBooksResource;

class BookController extends Controller
{
   
    public function index(Request $request)
    {
        $books = Book::where('activo', true)->get();
        $user = $request->user();

        if ($user) {
            $savedBookIds = $user->savedBooks()
            ->wherePivot('is_saved', 1)
            ->pluck('book_id')
            ->toArray();

            foreach ($books as $book) {
                $book->is_saved = in_array($book->id, $savedBookIds);
            }
        } else {
            foreach ($books as $book) {
                $book->is_saved = false;
            }
        }

        return ListBookResource::collection($books);
    }
   
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

  
    public function show($id)
    {
        $book = Book::with('categories')->findOrFail($id);

        if (!$book || !$book->activo) {
            return response()->json(['message' => 'Libro no encontrado o ha sido eliminado.'], 404);
        }

        return new BookResource($book);
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

   public function byCategory(Request $request, $categoryId)
    {
        $user = $request->user();

        // Traer libros por categoría y cargar 'position'
        $books = \App\Models\Book::where('activo', true)
            ->whereHas('categories', function($query) use ($categoryId) {
                $query->where('categories.id', $categoryId);
            })
            ->with([
                'categories' => function ($query) {
                    $query->select('categories.id', 'categories.name')
                        ->withPivot('position');
                }
            ])
            ->get();

        // IDs de libros guardados por el usuario autenticado
        $savedBookIds = $user
            ? $user->savedBooks()
            ->wherePivot('is_saved', 1)
            ->pluck('book_id')
            ->toArray()
            : [];

        // Agregar propiedad is_saved y ordenar por position
        $books = $books->map(function ($book) use ($savedBookIds, $categoryId) {
            $book->is_saved = in_array($book->id, $savedBookIds);

            // Encontrar la categoría actual y sacar su posición
            $currentCategory = $book->categories->firstWhere('id', $categoryId);
            $book->position = $currentCategory ? $currentCategory->pivot->position : 999;

            return $book;
        })
        ->sortBy('position')
        ->values();

        return CategoryBooksResource::collection($books);
    }


    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json([]);
        }

        // Buscar libros que coincidan con el texto
        $books = \App\Models\Book::where('activo', 1)
            ->where(function($q) use ($query) {
                $q->where('titulo', 'LIKE', "%{$query}%")
                ->orWhere('autor', 'LIKE', "%{$query}%")
                ->orWhere('descripcion', 'LIKE', "%{$query}%");
            })
            ->with('categories')
            ->get();

        // Buscar si hay alguna categoría que coincida con el texto
        $category = \App\Models\Category::where('name', 'LIKE', "%{$query}%")->first();

        $booksByCategory = collect();

        if ($category) {
            $booksByCategory = \App\Models\Book::whereHas('categories', function($q) use ($category) {
                    $q->where('categories.id', $category->id);
                })
                ->where('activo', 1)
                ->with('categories')
                ->get()
                ->diff($books); // Evitar duplicados
        }

        // Unir resultados y devolver
        $result = $books->concat($booksByCategory)->values();

        return response()->json($result);
    }

}