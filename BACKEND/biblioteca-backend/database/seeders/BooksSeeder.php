<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Book; // Asegúrate de tener este modelo creado

class BooksSeeder extends Seeder
{
    public function run(): void
    {
        $libros = [
            [
                'titulo' => 'Cien Años de Soledad',
                'descripcion' => 'Una obra cumbre de la literatura latinoamericana que relata la historia de la familia Buendía en el mítico pueblo de Macondo.',
                'autor' => 'Gabriel García Márquez',
                'año' => 1967,
                'isbn' => '9780307474728',
                'categorias' => 'Novela',
                'imagen' => 'https://drive.google.com/file/d/1zGdvmA-1i9ixKigLfzDjDyU12bgQwfIZ/view?usp=drive_link',
            ],
            [
                'titulo' => 'La Vorágine',
                'descripcion' => 'Un clásico colombiano que denuncia los abusos en la explotación del caucho en la selva amazónica.',
                'autor' => 'José Eustasio Rivera',
                'año' => 1924,
                'isbn' => '9789583000170',
                'categorias' => 'Novela',
                'imagen' => 'https://drive.google.com/file/d/1yS6eUjEwcZqwUvjTjeo4b348V2sVw48P/view?usp=drive_link',
            ],
            [
                'titulo' => 'El Amor en los Tiempos del Cólera',
                'descripcion' => 'Una historia de amor eterno que explora la pasión, el tiempo y la fidelidad a través de los años.',
                'autor' => 'Gabriel García Márquez',
                'año' => 1985,
                'isbn' => '9780307389732',
                'categorias' => 'Novela',
                'imagen' => 'https://drive.google.com/file/d/1BuzpWQ7Ull94DQhDEmYWAkayNayQTXif/view?usp=drive_link',
            ],
            [
                'titulo' => 'Pedro Páramo',
                'descripcion' => 'Un viaje onírico y poético al pueblo de Comala en busca del padre perdido, en medio de voces del más allá.',
                'autor' => 'Juan Rulfo',
                'año' => 1955,
                'isbn' => '9788437604947',
                'categorias' => 'Novela',
                'imagen' => 'https://drive.google.com/file/d/1BQxmvPSK9-AJDRvBmdZPGwLLfQstdvSO/view?usp=drive_link',
            ],
            [
                'titulo' => 'Rayuela',
                'descripcion' => 'Una novela experimental que desafía la lectura lineal, símbolo del boom latinoamericano.',
                'autor' => 'Julio Cortázar',
                'año' => 1963,
                'isbn' => '9788437602288',
                'categorias' => 'Novela',
                'imagen' => 'https://drive.google.com/file/d/1wdNDxSmxuo_zsl5I9El3c9b1xcHdg7Ow/view?usp=drive_link',
            ],
            [
                'titulo' => 'Santa',
                'descripcion' => 'Una cruda historia de redención y tragedia sobre una joven mexicana en situación de prostitución.',
                'autor' => 'Federico Gamboa',
                'año' => 1903,
                'isbn' => '9789682314344',
                'categorias' => 'Novela',
                'imagen' => 'https://drive.google.com/file/d/1p7vBaG-cftZpUTa6JCfmuQFws2Fms6lX/view?usp=drive_link',
            ],
            [
                'titulo' => 'Los Detectives Salvajes',
                'descripcion' => 'Un mosaico narrativo que sigue las huellas de dos poetas desaparecidos en un viaje por la literatura y la identidad latinoamericana.',
                'autor' => 'Roberto Bolaño',
                'año' => 1998,
                'isbn' => '9788433973979',
                'categorias' => 'Novela',
                'imagen' => 'https://drive.google.com/file/d/12Uc8orpKNskjXPkf6DwxSl4g6nuMNRIW/view?usp=drive_link',
            ],
            [
                'titulo' => 'Del Amor y Otros Demonios',
                'descripcion' => 'Un amor imposible en medio de supersticiones, religión y locura en la época colonial.',
                'autor' => 'Gabriel García Márquez',
                'año' => 1994,
                'isbn' => '9780307387264',
                'categorias' => 'Novela',
                'imagen' => 'https://drive.google.com/file/d/1w3fMqBKxFeWusuy-lhgmHIKxKzEsQF3U/view?usp=drive_link',
            ],
        ];

        foreach ($libros as $libro) {
            Book::firstOrCreate(
                ['titulo' => $libro['titulo'], 'autor' => $libro['autor']],
                [
                    'descripcion' => $libro['descripcion'],
                    'año' => $libro['año'],
                    'isbn' => $libro['isbn'],
                    'categorias' => $libro['categorias'],
                    'imagen' => $libro['imagen'],
                ]
            );
        }
    }
}
