<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePromptRequest;
use App\Models\AiTool;
use App\Models\Category;
use App\Models\Prompt;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class PromptIngestController extends Controller
{
    /**
     * Store an automated prompt payload from Antigravity/Python bots.
     */
    public function store(StorePromptRequest $request): JsonResponse
    {
        $botToken = env('BOT_TOKEN');
        $headerToken = $request->header('X-BOT-TOKEN');

        if (!$botToken || $headerToken !== $botToken) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: Invalid or missing X-BOT-TOKEN header.',
            ], 401);
        }

        $validated = $request->validated();

        // Resolve AI Tool ID
        $aiToolId = $validated['ai_tool_id'] ?? null;
        if (!$aiToolId && !empty($validated['ai_tool_slug'])) {
            $tool = AiTool::where('slug', $validated['ai_tool_slug'])->first();
            $aiToolId = $tool?->id;
        }

        if (!$aiToolId) {
            return response()->json([
                'success' => false,
                'message' => 'Valid ai_tool_id or ai_tool_slug is required.',
            ], 422);
        }

        // Resolve Category ID
        $categoryId = $validated['category_id'] ?? null;
        if (!$categoryId && !empty($validated['category_slug'])) {
            $category = Category::where('slug', $validated['category_slug'])->first();
            $categoryId = $category?->id;
        }

        if (!$categoryId) {
            return response()->json([
                'success' => false,
                'message' => 'Valid category_id or category_slug is required.',
            ], 422);
        }

        // Generate or ensure unique slug
        $baseSlug = !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['title']);
        $slug = $baseSlug;
        $counter = 1;
        while (Prompt::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        $prompt = Prompt::create([
            'ai_tool_id' => $aiToolId,
            'category_id' => $categoryId,
            'title' => $validated['title'],
            'slug' => $slug,
            'prompt_text' => $validated['prompt_text'],
            'negative_prompt' => $validated['negative_prompt'] ?? null,
            'model_version' => $validated['model_version'] ?? null,
            'aspect_ratio' => $validated['aspect_ratio'] ?? '9:16',
            'preview_video_url' => $validated['preview_video_url'],
            'preview_thumbnail_url' => $validated['preview_thumbnail_url'] ?? null,
            'custom_affiliate_url' => $validated['custom_affiliate_url'] ?? null,
            'is_published' => $validated['is_published'] ?? true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Prompt created successfully.',
            'data' => $prompt->load(['aiTool', 'category']),
        ], 201);
    }
}
