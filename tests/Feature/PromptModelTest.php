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
        $this->assertDatabaseHas('categories', ['slug' => 'cinematic-film']);
        $this->assertDatabaseHas('categories', ['slug' => '3d-animation']);
        $this->assertDatabaseHas('categories', ['slug' => 'commercial']);
        $this->assertDatabaseHas('categories', ['slug' => 'photorealism']);

        $this->assertDatabaseHas('ai_tools', ['slug' => 'higgsfield-ai']);
        $this->assertDatabaseHas('ai_tools', ['slug' => 'kling-ai']);
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
