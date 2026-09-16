<?php

namespace Tests\Feature;

use App\Models\AiTool;
use App\Models\Category;
use App\Models\Prompt;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_authenticated_user_can_view_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_create_prompt(): void
    {
        $user = User::factory()->create();
        $tool = AiTool::first();
        $category = Category::first();

        $response = $this->actingAs($user)->post('/dashboard/prompts', [
            'title' => 'Dashboard Created Video Prompt',
            'prompt_text' => 'A hyperrealistic golden eagle soaring above snow mountains',
            'ai_tool_id' => $tool->id,
            'category_id' => $category->id,
            'preview_video_url' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            'aspect_ratio' => '9:16',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('prompts', [
            'title' => 'Dashboard Created Video Prompt',
        ]);
    }

    public function test_authenticated_user_can_toggle_publish(): void
    {
        $user = User::factory()->create();
        $prompt = Prompt::first();
        $initialState = $prompt->is_published;

        $response = $this->actingAs($user)->patch('/dashboard/prompts/' . $prompt->id . '/toggle');

        $response->assertRedirect();
        $this->assertEquals(!$initialState, $prompt->fresh()->is_published);
    }
}
