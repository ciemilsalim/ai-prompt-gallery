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
        $runway = AiTool::where('slug', 'runway')->first();
        $hailuo = AiTool::where('slug', 'hailuo-ai')->first();
        $luma = AiTool::where('slug', 'luma-dream-machine')->first();
        $heygen = AiTool::where('slug', 'heygen')->first();
        $pika = AiTool::where('slug', 'pika')->first();
        $openrouter = AiTool::where('slug', 'openrouter')->first();

        $viralHooks = Category::where('slug', 'viral-hooks-creator')->first();
        $ugc = Category::where('slug', 'ugc-product-reviews')->first();
        $cinematic = Category::where('slug', 'cinematic-filmmaking')->first();
        $edu = Category::where('slug', 'educontent-explainers')->first();
        $commercial = Category::where('slug', 'brand-commercial-ads')->first();
        $animation = Category::where('slug', '3d-motion-anime')->first();
        $photorealism = Category::where('slug', 'photorealism-lifestyle')->first();

        $prompts = [
            // 1. Viral Hooks & Creator (Kling AI)
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

            // 2. UGC & Product Reviews (HeyGen - Avatar / Creator)
            [
                'ai_tool_id' => $heygen?->id,
                'category_id' => $ugc?->id,
                'title' => 'HeyGen AI Talking Creator: Viral TikTok Affiliate Product Pitch',
                'slug' => 'heygen-ai-talking-creator-viral-tiktok-affiliate-product-pitch',
                'prompt_text' => 'Realistic young female content creator avatar in cozy home studio wearing casual oversized knitwear, speaking expressively directly into camera, natural blinking and lively hand gestures, holding up a matte skincare bottle, TikTok creator desk background with RGB lighting, perfect lip-sync.',
                'negative_prompt' => 'stiff head, unnatural mouth movements, robotic voice, uncanny valley',
                'model_version' => 'HeyGen Interactive Avatar v2',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 6100,
                'copies_count' => 1240,
                'clicks_count' => 489,
                'is_published' => true,
            ],

            // 3. Cinematic & Filmmaking (Runway Gen-3 Alpha)
            [
                'ai_tool_id' => $runway?->id,
                'category_id' => $cinematic?->id,
                'title' => 'Runway Gen-3: Deep Space Exploration Ship Cinematic Reveal',
                'slug' => 'runway-gen-3-deep-space-exploration-ship-cinematic-reveal',
                'prompt_text' => 'FPV cinematic drone camera pulling backward through an icy asteroid belt to reveal a colossal interstellar science explorer starship, thruster plasma exhaust glowing violet, sunlight reflecting off solar panel mirrors, Hans Zimmer interstellar mood, hyper-detailed 70mm anamorphic footage.',
                'negative_prompt' => 'cartoon, low-polygon, motion artifacts, jittery frame, oversaturated',
                'model_version' => 'Runway Gen-3 Alpha',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 7420,
                'copies_count' => 1480,
                'clicks_count' => 620,
                'is_published' => true,
            ],

            // 4. EduContent & Explainers (Hailuo AI / MiniMax)
            [
                'ai_tool_id' => $hailuo?->id,
                'category_id' => $edu?->id,
                'title' => 'Hailuo AI: Microscopic Immune Cell Defending Body Animation',
                'slug' => 'hailuo-ai-microscopic-immune-cell-defending-body-animation',
                'prompt_text' => 'Macro 3D medical documentary animation, realistic white blood cell engulfing a glowing virus particle in bloodstream, fluid physics simulation, microscopic depth of field, translucent cellular membranes, educational voiceover ready, high science documentary realism.',
                'negative_prompt' => 'flat 2d, schematic diagram, inaccurate anatomy, pixelated',
                'model_version' => 'Hailuo T2V-01',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 3640,
                'copies_count' => 720,
                'clicks_count' => 275,
                'is_published' => true,
            ],

            // 5. Brand Commercial & Ads (Luma Dream Machine)
            [
                'ai_tool_id' => $luma?->id,
                'category_id' => $commercial?->id,
                'title' => 'Luma Dream Machine: Sleek Electric Hypercar Neon Tunnel Flyby',
                'slug' => 'luma-dream-machine-sleek-electric-hypercar-neon-tunnel-flyby',
                'prompt_text' => 'Continuous dynamic low-angle tracking shot orbiting around an aerodynamic matte-black electric hypercar drifting through a cyber neon tunnel, tire smoke with laser reflections, seamless 3D spatial camera motion, high-end automotive Super Bowl commercial aesthetics.',
                'negative_prompt' => 'morphing car body, wheel distortion, erratic camera cuts, low resolution',
                'model_version' => 'Dream Machine v1.5',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 5210,
                'copies_count' => 980,
                'clicks_count' => 415,
                'is_published' => true,
            ],

            // 6. Viral Hooks (Pika Squish Effect)
            [
                'ai_tool_id' => $pika?->id,
                'category_id' => $viralHooks?->id,
                'title' => 'Pika Viral Pikaffects: Hydraulic Press Squeezing Inflatable Planet',
                'slug' => 'pika-viral-pikaffects-hydraulic-press-squeezing-inflatable-planet',
                'prompt_text' => 'Satisfying viral ASMR video, hydraulic press squishing a squishy elastic globe Earth into soft jelly slime with exaggerated bouncy physics, jelly splatter, bright studio rim light, TikTok viral odd satisfaction video format, 60fps.',
                'negative_prompt' => 'violent, messy blur, bad physics, low framerate',
                'model_version' => 'Pika 2.0 Pikaffects',
                'aspect_ratio' => '9:16',
                'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                'preview_thumbnail_url' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
                'custom_affiliate_url' => null,
                'views_count' => 8900,
                'copies_count' => 1750,
                'clicks_count' => 740,
                'is_published' => true,
            ],

            // 7. Photorealism & Lifestyle (Higgsfield AI)
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
