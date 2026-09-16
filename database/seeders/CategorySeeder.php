<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Cinematic Film', 'slug' => 'cinematic-film'],
            ['name' => '3D Animation', 'slug' => '3d-animation'],
            ['name' => 'Commercial', 'slug' => 'commercial'],
            ['name' => 'Photorealism', 'slug' => 'photorealism'],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::updateOrCreate(
                ['slug' => $category['slug']],
                ['name' => $category['name']]
            );
        }
    }
}
