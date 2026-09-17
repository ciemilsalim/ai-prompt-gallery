<?php

namespace Tests\Feature;

use App\Models\AiTool;
use App\Models\Category;
use App\Models\Prompt;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PromptModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_seeded_data_exists_and_relationships_work(): void
    {
        $this->seed();
        $this->assertDatabaseHas('categories', ['slug' => 'viral-hooks-creator']);
        $this->assertDatabaseHas('categories', ['slug' => 'ugc-product-reviews']);
        $this->assertDatabaseHas('categories', ['slug' => 'cinematic-filmmaking']);
        $this->assertDatabaseHas('categories', ['slug' => 'educontent-explainers']);

        $this->assertDatabaseHas('ai_tools', ['slug' => 'higgsfield-ai']);
        $this->assertDatabaseHas('ai_tools', ['slug' => 'kling-ai']);
        $this->assertDatabaseHas('ai_tools', ['slug' => 'runway']);
        $this->assertDatabaseHas('ai_tools', ['slug' => 'hailuo-ai']);
        $this->assertDatabaseHas('ai_tools', ['slug' => 'luma-dream-machine']);
        $this->assertDatabaseHas('ai_tools', ['slug' => 'heygen']);
        $this->assertDatabaseHas('ai_tools', ['slug' => 'pika']);
        $this->assertDatabaseHas('ai_tools', ['slug' => 'openrouter']);

        $prompts = Prompt::with(['aiTool', 'category'])->get();
        $this->assertGreaterThanOrEqual(3, $prompts->count());

        foreach ($prompts as $prompt) {
            $this->assertNotNull($prompt->aiTool);
            $this->assertNotNull($prompt->category);
            $this->assertNotEmpty($prompt->slug);
            $this->assertNotEmpty($prompt->prompt_text);
            $this->assertNotEmpty($prompt->preview_video_url);
        }
    }
}
