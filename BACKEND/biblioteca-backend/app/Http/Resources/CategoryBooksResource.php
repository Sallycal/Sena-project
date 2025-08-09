<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryBooksResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'autor'   => $this->autor,
            'titulo'   => $this->titulo,
            'imagen'   => $this->imagen,
            'activo'   => $this->activo,
            'is_saved' => $this->is_saved, // ya calculado en el controlador
            'categories' => $this->categories->map(function ($category) {
                return [
                    'id'    => $category->id,
                    'name'  => $category->name,
                    'pivot' => [
                        'position' => $category->pivot->position
                    ]
                ];
            }),
        ];
    }
}
