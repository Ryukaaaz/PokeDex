<?php

namespace Database\Seeders\Master;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Grade;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $sets = [
            [
                'name' => 'Raw',
            ],
            [
                'name' => 'PSA 1',
            ],
            [
                'name' => 'PSA 2',
            ],
            [
                'name' => 'PSA 3',
            ],
            [
                'name' => 'PSA 4',
            ],
            [
                'name' => 'PSA 5',
            ],
            [
                'name' => 'PSA 6',
            ],
            [
                'name' => 'PSA 7',
            ],
            [
                'name' => 'PSA 8 (Near Mint)',
            ],
            [
                'name' => 'PSA 9 (Mint)',
            ],
            [
                'name' => 'PSA 10 (Gem Mint)',
            ],

        ];
        foreach ($sets as $set){
            Grade::updateOrCreate(
                ['name'=>$set['name']],
                $set
            );
        }
    }
}
