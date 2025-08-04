<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
    {
        Schema::table('saved_books', function (Blueprint $table) {
            $table->boolean('is_saved')->default(true)->after('book_id');
        });
    }

    public function down()
    {
        Schema::table('saved_books', function (Blueprint $table) {
            $table->dropColumn('is_saved');
        });
    }
};
