<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $higgsfield = \App\Models\AiTool::where('slug', 'higgsfield-ai')->first();
        $kling = \App\Models\AiTool::where('slug', 'kling-ai')->first();
        $openrouter = \App\Models\AiTool::where('slug', 'openrouter')->first();

        $cinematic = \App\Models\Category::where('slug', 'cinematic-film')->first();
        $animation = \App\Models\Category::where('slug', '3d-animation')->first();
        $commercial = \App\Models\Category::where('slug', 'commercial')->first();
        $photorealism = \App\Models\Category::where('slug', 'photorealism')->first();

        $prompts = [
            [
                'ai_tool_id' => $higgsfield?->id,
                'category_id' => $cinematic?->id,
                'title' => 'Cyberpunk Neon Samurai in Tokyo Rain',
                'slug' => 'cyberpunk-neon-samurai-in-tokyo-rain',
                'prompt_text' => 'Cinematic medium tracking shot of a futuristic samurai wearing dark carbon armor walking down a rain-slicked Shinjuku alleyway, neon signs reflecting on puddles, anamorphic lens flare, volumetric fog, moody dark film grading, 8k resolution.',
                'negative_prompt' => 'low quality, blurry, deformed, cartoon, oversaturated, amateur footage',
                'model_version' => 'Higgsfield Cinema v2.1',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 1420,
                'copies_count' => 285,
                'clicks_count' => 97,
                'is_published' => true,
            ],
            [
                'ai_tool_id' => $kling?->id,
                'category_id' => $animation?->id,
                'title' => 'Cute 3D Robot Chef Cooking Pancakes',
                'slug' => 'cute-3d-robot-chef-cooking-pancakes',
                'prompt_text' => '3D animation octane render, a tiny charming brass robot wearing a tall chef hat flipping golden fluffy pancakes in a sunlit rustic kitchen, warm morning sunlight, vibrant colors, Pixar Disney aesthetics, depth of field.',
                'negative_prompt' => 'ugly, 2d, low poly, noisy, dark, harsh shadows',
                'model_version' => 'Kling 1.5 Pro',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 980,
                'copies_count' => 192,
                'clicks_count' => 64,
                'is_published' => true,
            ],
            [
                'ai_tool_id' => $kling?->id,
                'category_id' => $commercial?->id,
                'title' => 'Luxury Perfume Bottle Floating in Rippling Water',
                'slug' => 'luxury-perfume-bottle-floating-in-rippling-water',
                'prompt_text' => 'High-end luxury commercial slow-motion shot, minimalist matte black perfume bottle submerging into crystal clear rippling turquoise water, microscopic air bubbles rising, dramatic studio lighting, macro lens, hyper-detailed.',
                'negative_prompt' => 'cheap packaging, murky water, low resolution, bad lighting',
                'model_version' => 'Kling 1.5 Pro',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 2150,
                'copies_count' => 430,
                'clicks_count' => 178,
                'is_published' => true,
            ],
            [
                'ai_tool_id' => $higgsfield?->id,
                'category_id' => $photorealism?->id,
                'title' => 'Photorealistic Portrait of an Old Sailor in Arctic Mist',
                'slug' => 'photorealistic-portrait-of-an-old-sailor-in-arctic-mist',
                'prompt_text' => 'Ultra-photorealistic close-up slow-motion portrait of a weathered 65-year-old Scandinavian fisherman on a trawler deck, sea spray on his rugged beard, piercing blue eyes staring at icy horizon, atmospheric mist, National Geographic cinematography, IMAX 70mm.',
                'negative_prompt' => 'smooth skin, plastic, CGI look, oversaturated, blurred details',
                'model_version' => 'Higgsfield Cinema v2.1',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 3100,
                'copies_count' => 612,
                'clicks_count' => 245,
                'is_published' => true,
            ],
        ];

        foreach ($prompts as $promptData) {
            if ($promptData['ai_tool_id'] && $promptData['category_id']) {
                \App\Models\Prompt::updateOrCreate(
                    ['slug' => $promptData['slug']],
                    $promptData
                );
            }
        }
    }
}
