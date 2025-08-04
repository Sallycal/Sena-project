<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SavedBookResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'      => $this->id,
            'titulo'  => $this->titulo,
            'autor'   => $this->autor,
            'año'     => $this->año,
            'imagen'  => $this->imagen,
            'is_saved' => $this->pivot->is_saved ?? false,
        ];
    }
}
