<?php

namespace App\Http\Controllers;

use App\Models\AiTool;
use App\Models\Category;
use App\Models\Prompt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin / creator dashboard.
     */
    public function index(): Response
    {
        $stats = [
            'total_prompts' => Prompt::count(),
            'total_views' => (int) Prompt::sum('views_count'),
            'total_copies' => (int) Prompt::sum('copies_count'),
            'total_clicks' => (int) Prompt::sum('clicks_count'),
            'total_tools' => AiTool::count(),
            'total_categories' => Category::count(),
        ];

        $prompts = Prompt::with(['aiTool', 'category'])
            ->latest()
            ->paginate(10);

        $categories = Category::select('id', 'name')->get();
        $aiTools = AiTool::where('is_active', true)->select('id', 'name')->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'prompts' => $prompts,
            'categories' => $categories,
            'aiTools' => $aiTools,
            'botToken' => env('BOT_TOKEN', 'prompt_gallery_secret_bot_token_2026'),
        ]);
    }

    /**
     * Store a newly created prompt from dashboard.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'prompt_text' => 'required|string',
            'ai_tool_id' => 'required|exists:ai_tools,id',
            'category_id' => 'required|exists:categories,id',
            'preview_video_url' => 'required|url|max:500',
            'aspect_ratio' => 'nullable|string|max:20',
            'model_version' => 'nullable|string|max:100',
            'custom_affiliate_url' => 'nullable|url|max:500',
        ]);

        $baseSlug = Str::slug($validated['title']);
        $slug = $baseSlug;
        $counter = 1;
        while (Prompt::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        Prompt::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'prompt_text' => $validated['prompt_text'],
            'ai_tool_id' => $validated['ai_tool_id'],
            'category_id' => $validated['category_id'],
            'preview_video_url' => $validated['preview_video_url'],
            'aspect_ratio' => $validated['aspect_ratio'] ?: '9:16',
            'model_version' => $validated['model_version'] ?? null,
            'custom_affiliate_url' => $validated['custom_affiliate_url'] ?? null,
            'is_published' => true,
        ]);

        return back()->with('success', 'Prompt berhasil ditambahkan!');
    }

    /**
     * Toggle publish status of a prompt.
     */
    public function togglePublish(Prompt $prompt): RedirectResponse
    {
        $prompt->update([
            'is_published' => !$prompt->is_published,
        ]);

        return back()->with('success', 'Status publikasi berhasil diperbarui.');
    }

    /**
     * Delete a prompt from dashboard.
     */
    public function destroy(Prompt $prompt): RedirectResponse
    {
        $prompt->delete();

        return back()->with('success', 'Prompt berhasil dihapus.');
    }
}
