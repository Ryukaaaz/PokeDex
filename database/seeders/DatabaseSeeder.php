<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\Master\ExpansionSetSeeder;
use Database\Seeders\Master\CardSeeder;
use Database\Seeders\Master\GradeSeeder;
use Database\Seeders\Master\InventorySeeder;
use Database\Seeders\Master\RaritySeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            ExpansionSetSeeder::class,
            GradeSeeder::class,
            RaritySeeder::class,
            CardSeeder::class,
            InventorySeeder::class,
        ]);
    }
}
