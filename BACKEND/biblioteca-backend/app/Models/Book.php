<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'titulo',
        'descripcion',
        'autor',
        'año',
        'isbn',
        'imagen',
        'activo',
        'contenido',
        
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class)
                ->withPivot('position')
                ->withTimestamps()
                ->orderBy('pivot_position'); // siempre ordenadas
    }

    public function readers()
    {
        return $this->belongsToMany(User::class, 'book_user_reads')
                    ->withPivot('read_at')
                    ->withTimestamps();  
    }

    public function usersWhoSaved()
    {
        return $this->belongsToMany(User::class, 'saved_books')
                ->withPivot('is_saved')
                ->withTimestamps();
    }

}