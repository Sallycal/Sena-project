<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Http\Resources\BookReadResource;


class BookReadController extends Controller
{
    public function markAsRead(Request $request, Book $book)
    {
        $user = $request->user();

        $user->booksRead()->syncWithoutDetaching([
            $book->id => ['read_at' => now()]
        ]);

        return response()->json(['message' => 'Libro marcado como leído.']);
    }

    public function historialLecturas(Request $request)
    {
        $user = $request->user();
        $lecturas = $user->booksRead()
            ->orderByDesc('pivot_read_at')
            ->take(20)
            ->get();

        return BookReadResource::collection($lecturas);
    }

}