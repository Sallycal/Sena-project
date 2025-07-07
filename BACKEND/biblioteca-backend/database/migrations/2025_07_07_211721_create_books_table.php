<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('titulo'); 
            $table->text('descripcion')->nullable();
            $table->string('autor');
            $table->integer('año')->nullable();
            $table->string('isbn')->nullable();
            $table->string('categorias')->nullable(); // o JSON si usarás múltiples categorías
            $table->string('imagen')->nullable(); // ruta o nombre del archivo
            $table->timestamps();      
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
