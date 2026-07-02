<?php

namespace Database\Seeders\Master;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Card;

class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $sets = [
            [
                'expansion_set_id' => 1,
                'name' => 'Pikachu',
                'card_number' => 1,
                'rarity' => 'Common',
                'grade' => 'Raw',
            ],
            [
                'expansion_set_id' => 1,
                'name' => 'Charmander',
                'card_number' => 2,
                'rarity' => 'Common',
                'grade' => '10',
            ],
            [
                'expansion_set_id' => 2,
                'name' => 'Squirtle',
                'card_number' => 1,
                'rarity' => 'Common',
                'grade' => 'Raw',
            ],

        ];
        foreach ($sets as $set) {
            Card::updateOrCreate(
                ['card_number' => $set['card_number'], 'expansion_set_id' => $set['expansion_set_id']],
                $set
            );
        }
    }
}
