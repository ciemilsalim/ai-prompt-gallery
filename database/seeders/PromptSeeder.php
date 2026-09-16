<?php

namespace Database\Seeders;

use App\Models\AiTool;
use App\Models\Category;
use App\Models\Prompt;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $higgsfield = AiTool::where('slug', 'higgsfield-ai')->first();
        $kling = AiTool::where('slug', 'kling-ai')->first();
        $openrouter = AiTool::where('slug', 'openrouter')->first();

        $viralHooks = Category::where('slug', 'viral-hooks-creator')->first();
        $ugc = Category::where('slug', 'ugc-product-reviews')->first();
        $cinematic = Category::where('slug', 'cinematic-filmmaking')->first();
        $edu = Category::where('slug', 'educontent-explainers')->first();
        $commercial = Category::where('slug', 'brand-commercial-ads')->first();
        $animation = Category::where('slug', '3d-motion-anime')->first();
        $photorealism = Category::where('slug', 'photorealism-lifestyle')->first();

        $prompts = [
            // 1. Viral Hooks & Creator
            [
                'ai_tool_id' => $kling?->id,
                'category_id' => $viralHooks?->id,
                'title' => 'Mind-Bending 3-Second Viral Hook: Floor Turns to Lava',
                'slug' => 'mind-bending-3-second-viral-hook-floor-turns-to-lava',
                'prompt_text' => 'First-person POV viral TikTok hook, creator walking into modern living room when suddenly hardwood floor instantly melts into glowing molten volcanic lava with crackling sparks, extreme dynamic camera shake, hyperrealistic reflections, 4k 60fps vertical format.',
                'negative_prompt' => 'low quality, blurry, 2d, cartoonish, static camera',
                'model_version' => 'Kling 1.5 Pro',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 4520,
                'copies_count' => 890,
                'clicks_count' => 312,
                'is_published' => true,
            ],

            // 2. UGC & Product Reviews
            [
                'ai_tool_id' => $higgsfield?->id,
                'category_id' => $ugc?->id,
                'title' => 'Aesthetic UGC Unboxing: Minimalist Vitamin C Glow Serum',
                'slug' => 'aesthetic-ugc-unboxing-minimalist-vitamin-c-glow-serum',
                'prompt_text' => 'Authentic UGC creator style smartphone video, female hands unboxing aesthetic pastel skincare packaging on a clean white desk, lifting frosted amber dropper bottle, soft natural bedroom sunlight, macro lens focus on a golden serum droplet falling in slow motion, relatable influencer aesthetic.',
                'negative_prompt' => 'distorted fingers, bad hands, plastic look, fake CGI, overexposed',
                'model_version' => 'Higgsfield Cinema v2.1',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 3180,
                'copies_count' => 540,
                'clicks_count' => 228,
                'is_published' => true,
            ],

            // 3. Cinematic & Filmmaking
            [
                'ai_tool_id' => $higgsfield?->id,
                'category_id' => $cinematic?->id,
                'title' => 'Cyberpunk Neon Samurai in Rain-Slicked Neo Tokyo',
                'slug' => 'cyberpunk-neon-samurai-in-rain-slicked-neo-tokyo',
                'prompt_text' => 'Cinematic slow-motion tracking shot of a lone cyber-samurai wearing matte carbon armor walking down a rain-drenched Shinjuku alleyway, neon holographic billboards reflecting on dark puddles, anamorphic lens flare, volumetric fog, moody Blade Runner film grading, IMAX 8k.',
                'negative_prompt' => 'low quality, blurry, deformed, cartoon, amateur footage, oversaturated',
                'model_version' => 'Higgsfield Cinema v2.1',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 5820,
                'copies_count' => 1120,
                'clicks_count' => 450,
                'is_published' => true,
            ],

            // 4. EduContent & Explainers
            [
                'ai_tool_id' => $openrouter?->id,
                'category_id' => $edu?->id,
                'title' => '3D Holographic Quantum Physics Explainer Animation',
                'slug' => '3d-holographic-quantum-physics-explainer-animation',
                'prompt_text' => 'Futuristic educational explainer motion graphic, rotating 3D glowing atomic nucleus with orbiting neon blue electrons, smooth camera orbit, clean minimal dark studio background, floating mathematical formulas, crisp high-tech science documentary visualization.',
                'negative_prompt' => 'pixelated, messy diagram, low res, watermark, noisy text',
                'model_version' => 'OpenRouter Multi-Engine',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 2840,
                'copies_count' => 460,
                'clicks_count' => 180,
                'is_published' => true,
            ],

            // 5. Brand Commercial & Ads
            [
                'ai_tool_id' => $kling?->id,
                'category_id' => $commercial?->id,
                'title' => 'Luxury Perfume Commercial Bottle Floating in Crystal Water',
                'slug' => 'luxury-perfume-commercial-bottle-floating-in-crystal-water',
                'prompt_text' => 'High-end luxury commercial slow-motion shot, minimalist matte black perfume bottle submerging into crystal clear rippling turquoise water, microscopic air bubbles rising, dramatic studio lighting, macro lens, hyper-detailed, Cannes Lions quality.',
                'negative_prompt' => 'cheap packaging, murky water, low resolution, bad lighting, grainy',
                'model_version' => 'Kling 1.5 Pro',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 3890,
                'copies_count' => 670,
                'clicks_count' => 295,
                'is_published' => true,
            ],

            // 6. 3D Motion & Anime
            [
                'ai_tool_id' => $kling?->id,
                'category_id' => $animation?->id,
                'title' => 'Cute 3D Pixar Style Robot Chef Cooking Golden Pancakes',
                'slug' => 'cute-3d-pixar-style-robot-chef-cooking-golden-pancakes',
                'prompt_text' => '3D animation octane render, a tiny charming brass robot wearing a tall chef hat flipping golden fluffy pancakes in a sunlit rustic kitchen, warm morning sunlight, vibrant colors, Pixar Disney aesthetics, depth of field, adorable expressions.',
                'negative_prompt' => 'ugly, 2d, low poly, noisy, dark, harsh shadows, creepy',
                'model_version' => 'Kling 1.5 Pro',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 4120,
                'copies_count' => 780,
                'clicks_count' => 310,
                'is_published' => true,
            ],

            // 7. Photorealism & Lifestyle
            [
                'ai_tool_id' => $higgsfield?->id,
                'category_id' => $photorealism?->id,
                'title' => 'Hyper-Photorealistic Nordic Sailor Portrait in Arctic Mist',
                'slug' => 'hyper-photorealistic-nordic-sailor-portrait-in-arctic-mist',
                'prompt_text' => 'Ultra-photorealistic close-up slow-motion portrait of a weathered 65-year-old Scandinavian fisherman on a trawler deck, sea spray on his rugged beard, piercing blue eyes staring at icy horizon, atmospheric mist, National Geographic cinematography, IMAX 70mm film stock.',
                'negative_prompt' => 'smooth skin, plastic, CGI look, oversaturated, blurred details, airbrushed',
                'model_version' => 'Higgsfield Cinema v2.1',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 5200,
                'copies_count' => 930,
                'clicks_count' => 380,
                'is_published' => true,
            ],
        ];

        foreach ($prompts as $promptData) {
            if ($promptData['ai_tool_id'] && $promptData['category_id']) {
                Prompt::updateOrCreate(
                    ['slug' => $promptData['slug']],
                    $promptData
                );
            }
        }
    }
}
