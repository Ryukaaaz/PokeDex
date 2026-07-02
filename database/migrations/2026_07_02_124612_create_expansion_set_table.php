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
        Schema::create('expansion_sets', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            //this table will store the code for each expansion set, which will be used for official/internal identifier used by Pokémon APIs and databases. (for future use)
            $table->string('series');
            //store the series name for the expansion set, e.g. "Scarlet & Violet", "Sword & Shield", "Sun & Moon", etc.
            $table->string('release_date');
            //store the release date for the expansion set, e.g. "2023-02-03", "2022-11-18", etc.
            $table->string('name');
            //store the expansion set name e.g. "White Flare", "Evolving Skies", "Chilling Reign", etc.
            $table->integer('printed_total');
            //store the total number of cards printed in the expansion set, e.g. 185 (excluding secret rares)
            $table->integer('total');
            //store the total number of cards in the expansion set, e.g. 185 (including secret rares)
            $table->string('language');
            //store the language of the expansion set, e.g. "en", "jp", "chn", etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expansion_set');
    }
};
