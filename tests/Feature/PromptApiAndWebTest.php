<?php

namespace Tests\Feature;

use App\Models\AiTool;
use App\Models\Category;
use App\Models\Prompt;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PromptApiAndWebTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_catalog_page_renders_successfully(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_affiliate_redirect_increments_clicks_and_redirects(): void
    {
        $prompt = Prompt::first();
        $initialClicks = $prompt->clicks_count;

        $response = $this->get('/r/' . $prompt->slug);

        $response->assertStatus(302);
        $this->assertEquals($initialClicks + 1, $prompt->fresh()->clicks_count);
    }

    public function test_track_copy_endpoint_increments_copies(): void
    {
        $prompt = Prompt::first();
        $initialCopies = $prompt->copies_count;

        $response = $this->postJson('/api/track-copy/' . $prompt->id);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'copies_count' => $initialCopies + 1,
        ]);
        $this->assertEquals($initialCopies + 1, $prompt->fresh()->copies_count);
    }

    public function test_bot_ingest_requires_valid_token(): void
    {
        $payload = [
            'title' => 'Bot Test Video Prompt',
            'prompt_text' => 'A futuristic drone flying over cyber metropolis',
            'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            'ai_tool_slug' => 'higgsfield-ai',
            'category_slug' => 'cinematic-film',
        ];

        // Without token
        $response = $this->postJson('/api/v1/prompts', $payload);
        $response->assertStatus(401);

        // With invalid token
        $response = $this->postJson('/api/v1/prompts', $payload, [
            'X-BOT-TOKEN' => 'wrong_token',
        ]);
        $response->assertStatus(401);

        // With valid token
        $response = $this->postJson('/api/v1/prompts', $payload, [
            'X-BOT-TOKEN' => env('BOT_TOKEN', 'prompt_gallery_secret_bot_token_2026'),
        ]);
        $response->assertStatus(201);
        $response->assertJson([
            'success' => true,
            'data' => [
                'title' => 'Bot Test Video Prompt',
            ],
        ]);

        $this->assertDatabaseHas('prompts', [
            'title' => 'Bot Test Video Prompt',
        ]);
    }
}
