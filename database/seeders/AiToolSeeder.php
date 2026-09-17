<?php

namespace Database\Seeders;

use App\Models\AiTool;
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
                'logo_url' => '/icons/tools/higgsfield-ai.svg',
                'description' => 'Generative video AI dengan kontrol sinematik tingkat tinggi, pergerakan karakter dinamis, dan fisika realistis.',
                'is_active' => true,
            ],
            [
                'name' => 'Kling AI',
                'slug' => 'kling-ai',
                'affiliate_url' => 'https://klingai.com/?ref=gallery_placeholder',
                'logo_url' => '/icons/tools/kling-ai.svg',
                'description' => 'Generator video canggih dengan framerate tinggi, durasi hingga 10 detik, dan simulasi gerak kompleks.',
                'is_active' => true,
            ],
            [
                'name' => 'Runway',
                'slug' => 'runway',
                'affiliate_url' => 'https://runwayml.com/?ref=gallery_placeholder',
                'logo_url' => '/icons/tools/runway.svg',
                'description' => 'Standar industri pembuatan film AI dengan engine Gen-3 Alpha, motion brush, dan kontrol kamera sinematik.',
                'is_active' => true,
            ],
            [
                'name' => 'Hailuo AI',
                'slug' => 'hailuo-ai',
                'affiliate_url' => 'https://hailuoai.video/?ref=gallery_placeholder',
                'logo_url' => '/icons/tools/hailuo-ai.svg',
                'description' => 'Model video AI mutakhir dari MiniMax dengan pemahaman prompt luar biasa dan pergerakan organik super mulus.',
                'is_active' => true,
            ],
            [
                'name' => 'Luma Dream Machine',
                'slug' => 'luma-dream-machine',
                'affiliate_url' => 'https://lumalabs.ai/dream-machine?ref=gallery_placeholder',
                'logo_url' => '/icons/tools/luma-dream-machine.svg',
                'description' => 'Engine video generatif berkecepatan tinggi dengan konsistensi 3D spasial dan tracking kamera spektakuler.',
                'is_active' => true,
            ],
            [
                'name' => 'HeyGen',
                'slug' => 'heygen',
                'affiliate_url' => 'https://heygen.com/?ref=gallery_placeholder',
                'logo_url' => '/icons/tools/heygen.svg',
                'description' => 'Platform AI Avatar video nomor 1 untuk konten kreator UGC, video pembelajaran/tutorial, dan video marketing multi-bahasa.',
                'is_active' => true,
            ],
            [
                'name' => 'Pika',
                'slug' => 'pika',
                'affiliate_url' => 'https://pika.art/?ref=gallery_placeholder',
                'logo_url' => '/icons/tools/pika.svg',
                'description' => 'Generator video kreatif dengan fitur efek viral Pikaffects (squish, melt, explode) favorit konten kreator TikTok & Reels.',
                'is_active' => true,
            ],
            [
                'name' => 'OpenRouter',
                'slug' => 'openrouter',
                'affiliate_url' => 'https://openrouter.ai/?ref=gallery_placeholder',
                'logo_url' => '/icons/tools/openrouter.svg',
                'description' => 'Unified AI API gateway untuk mengakses berbagai model multimodal dan generator prompt AI secara terintegrasi.',
                'is_active' => true,
            ],
        ];

        foreach ($tools as $tool) {
            AiTool::updateOrCreate(
                ['slug' => $tool['slug']],
                $tool
            );
        }
    }
}
