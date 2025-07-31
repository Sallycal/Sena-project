<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CategoryResource;

class BookResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'descripcion' => $this->descripcion,
            'autor' => $this->autor,
            'imagen' => $this->imagen,
            'pdf_filename' => $this->pdf_filename,
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'contenido' => $this->contenido,
        ];
    }
}
