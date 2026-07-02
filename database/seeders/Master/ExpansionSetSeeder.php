<?php

namespace Database\Seeders\Master;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ExpansionSet;

class ExpansionSetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sets = [

            [
                'code' => 'sv10',
                'name' => 'White Flare',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2025-07-18',
                'printed_total' => 170,
                'total' => 172,
            ],

            [
                'code' => 'sv10b',
                'name' => 'Black Bolt',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2025-07-18',
                'printed_total' => 170,
                'total' => 172,
            ],

            [
                'code' => 'sv9',
                'name' => 'Journey Together',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2025-03-28',
                'printed_total' => 159,
                'total' => 190,
            ],

            [
                'code' => 'sv8',
                'name' => 'Surging Sparks',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2024-11-08',
                'printed_total' => 191,
                'total' => 252,
            ],

            [
                'code' => 'sv7',
                'name' => 'Stellar Crown',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2024-09-13',
                'printed_total' => 175,
                'total' => 175,
            ],

            [
                'code' => 'sv6',
                'name' => 'Twilight Masquerade',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2024-05-24',
                'printed_total' => 167,
                'total' => 226,
            ],

            [
                'code' => 'sv5',
                'name' => 'Temporal Forces',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2024-03-22',
                'printed_total' => 162,
                'total' => 218,
            ],

            [
                'code' => 'sv4',
                'name' => 'Paradox Rift',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2023-11-03',
                'printed_total' => 182,
                'total' => 266,
            ],

            [
                'code' => 'sv3',
                'name' => 'Obsidian Flames',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2023-08-11',
                'printed_total' => 197,
                'total' => 230,
            ],

            [
                'code' => 'sv2',
                'name' => 'Paldea Evolved',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2023-06-09',
                'printed_total' => 193,
                'total' => 279,
            ],

            [
                'code' => 'sv1',
                'name' => 'Scarlet & Violet',
                'series' => 'Scarlet & Violet',
                'language' => 'EN',
                'release_date' => '2023-03-31',
                'printed_total' => 198,
                'total' => 258,
            ],

        ];
        // if model expansion have been created, then update or create the expansion set with the new data. If not, create a new expansion set with the data.
        foreach ($sets as $set) {
            ExpansionSet::updateOrCreate(
                ['code' => $set['code']],
                $set
            );
        }
    }
}
