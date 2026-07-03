<?php

namespace Database\Seeders\Master;

use App\Models\Rarity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RaritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $sets = [
            [
                'code' => 'C',
                'name' => 'Common'
            ],
            [
                'code' => 'U',
                'name' => 'Uncommon'
            ],
            [
                'code' => 'C',
                'name' => 'Common'
            ],
            [
                'code' => 'R',
                'name' => 'Rare'
            ],
            [
                'code' => 'RR',
                'name' => 'Double Rare'
            ],
            [
                'code' => 'SR',
                'name' => 'Ultra Rare'
            ],
            [
                'code' => 'AR',
                'name' => 'Illustration Rare'
            ],
            [
                'code' => 'SAR',
                'name' => 'Special Illustration Rare'
            ],
            [
                'code' => 'UR',
                'name' => 'Hyper Rare'
            ],
            [
                'code' => 'MUR',
                'name' => 'Mega Hyper Rare'
            ],
            [
                'code' => 'ACE',
                'name' => 'ACE SPEC Rare'
            ],
            [
                'code' => 'S',
                'name' => 'Shiny Rare'
            ],
            [
                'code' => 'SSR',
                'name' => 'Shiny Ultra Rare'
            ],
        ];

        foreach($sets as $set){
            Rarity::updateOrCreate(
                ['code' => $set['code']],
                $set
            );
        }
    }
}
