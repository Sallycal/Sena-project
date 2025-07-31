<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class BookReadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Fecha de lectura formateada
        $fechaLectura = optional($this->pivot)->read_at
            ? Carbon::parse($this->pivot->read_at)->locale('es')->isoFormat('D [de] MMMM [de] YYYY [a las] h:mm A')
            : null;

            return [
                'id' => $this->id,
                'titulo' => $this->titulo,
                'autor' => $this->autor,
                'año' => $this->año,
                'imagen' => $this->imagen,
                'activo' => $this->activo,
                'fecha_de_lectura' => $fechaLectura,
        ];
    }
}
