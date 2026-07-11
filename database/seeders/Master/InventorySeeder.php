<?php

namespace Database\Seeders\Master;

use App\Models\Inventory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $sets = [
            [
                'card_id' => 1,
                'grade_id' => 9,
                'quantity' => 1,

            ],
            [
                'card_id' => 1,
                'grade_id' => 8,
                'quantity' => 2,

            ],
            [
                'card_id' => 2,
                'grade_id' => 10,
                'quantity' => 2,

            ],
            [
                'card_id' => 3,
                'grade_id' => 7,
                'quantity' => 2,

            ],
        ];
        foreach($sets as $set){
            Inventory::updateOrCreate([
                'card_id' => $set['card_id'],
                'grade_id' => $set['grade_id'],
                'quantity' => $set['quantity'],
            ]);
        }
    }
}
