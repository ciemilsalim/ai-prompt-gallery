<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AiToolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tools = [
            [
                'name' => 'Higgsfield AI',
                'slug' => 'higgsfield-ai',
                'affiliate_url' => 'https://higgsfield.ai/?ref=gallery_placeholder',
                'logo_url' => 'https://placehold.co/100x100/18181b/10b981?text=Higgsfield',
                'description' => 'Generative video AI designed for cinema-grade motion, characters, and realistic physics.',
                'is_active' => true,
            ],
            [
                'name' => 'Kling AI',
                'slug' => 'kling-ai',
                'affiliate_url' => 'https://klingai.com/?ref=gallery_placeholder',
                'logo_url' => 'https://placehold.co/100x100/18181b/10b981?text=Kling',
                'description' => 'Next-generation video creation tool capable of high-framerate dynamic scenes and complex motions.',
                'is_active' => true,
            ],
            [
                'name' => 'OpenRouter',
                'slug' => 'openrouter',
                'affiliate_url' => 'https://openrouter.ai/?ref=gallery_placeholder',
                'logo_url' => 'https://placehold.co/100x100/18181b/10b981?text=OpenRouter',
                'description' => 'Unified AI API gateway to access hundreds of cutting-edge models seamlessly.',
                'is_active' => true,
            ],
        ];

        foreach ($tools as $tool) {
            \App\Models\AiTool::updateOrCreate(
                ['slug' => $tool['slug']],
                $tool
            );
        }
    }
}
