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
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('expansion_set_id')->constrained()->cascadeOnDelete();
            //to store the expansion set id for the card, and set up a foreign key constraint to the expansion_sets table
            $table->string('name');
            //to store the pokemon name for the card
            $table->integer('card_number');
            //to store the card number for the card
            $table->foreignId('rarity_id')->constrained()->restrictOnDelete();
            //to store the rarity id for the card
            $table->string('image')->nullable();
            //to store the image path
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
