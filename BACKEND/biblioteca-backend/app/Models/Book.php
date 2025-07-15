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
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class)
                ->withPivot('position')
                ->withTimestamps()
                ->orderBy('pivot_position'); // siempre ordenadas
    }

}
