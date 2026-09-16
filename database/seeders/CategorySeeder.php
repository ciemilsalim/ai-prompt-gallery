<?php

namespace Database\Seeders;

use App\Models\Category;
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
            [
                'name' => 'Viral Hooks & Creator',
                'slug' => 'viral-hooks-creator',
            ],
            [
                'name' => 'UGC & Product Reviews',
                'slug' => 'ugc-product-reviews',
            ],
            [
                'name' => 'Cinematic & Filmmaking',
                'slug' => 'cinematic-filmmaking',
            ],
            [
                'name' => 'EduContent & Explainers',
                'slug' => 'educontent-explainers',
            ],
            [
                'name' => 'Brand Commercial & Ads',
                'slug' => 'brand-commercial-ads',
            ],
            [
                'name' => '3D Motion & Anime',
                'slug' => '3d-motion-anime',
            ],
            [
                'name' => 'Photorealism & Lifestyle',
                'slug' => 'photorealism-lifestyle',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                ['name' => $category['name']]
            );
        }
    }
}
