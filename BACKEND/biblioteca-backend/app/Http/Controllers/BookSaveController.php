<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Http\Resources\SavedBookResource;

class BookSaveController extends Controller
{
    public function toggleSave(Request $request, Book $book)
    {
        $user = $request->user();

        $saved = $user->savedBooks()->where('book_id', $book->id)->first();

        if ($saved) {
            $current = $saved->pivot->is_saved;
            $user->savedBooks()->updateExistingPivot($book->id, [
                'is_saved' => !$current,
            ]);

            return response()->json([
                'message' => $current ? 'Libro desmarcado como guardado' : 'Libro marcado como guardado',
                'saved' => !$current,
            ]);
        } else {
            $user->savedBooks()->attach($book->id, ['is_saved' => true]);

            return response()->json([
                'message' => 'Libro guardado correctamente',
                'saved' => true,
            ]);
        }
    }

    public function listSavedBooks(Request $request)
    {
        $books = $request->user()
            ->savedBooks()
            ->wherePivot('is_saved', true)
            ->get();

        return SavedBookResource::collection($books);
    }
}
