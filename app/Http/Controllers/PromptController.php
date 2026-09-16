<?php

namespace App\Http\Controllers;

use App\Models\AiTool;
use App\Models\Category;
use App\Models\Prompt;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PromptController extends Controller
{
    /**
     * Display the mobile-first AI prompt catalog.
     */
    public function index(Request $request): Response
    {
        $selectedCategory = $request->query('category');
        $selectedTool = $request->query('tool');
        $search = $request->query('search');

        $query = Prompt::query()
            ->with(['aiTool:id,name,slug,logo_url', 'category:id,name,slug'])
            ->where('is_published', true);

        if (!empty($selectedCategory)) {
            $query->whereHas('category', function ($q) use ($selectedCategory) {
                $q->where('slug', $selectedCategory);
            });
        }

        if (!empty($selectedTool)) {
            $query->whereHas('aiTool', function ($q) use ($selectedTool) {
                $q->where('slug', $selectedTool);
            });
        }

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('prompt_text', 'like', "%{$search}%");
            });
        }

        $prompts = $query->latest()->paginate(12)->withQueryString();

        $categories = Category::select('id', 'name', 'slug')->get();
        $aiTools = AiTool::where('is_active', true)->select('id', 'name', 'slug', 'logo_url')->get();

        return Inertia::render('Welcome', [
            'prompts' => $prompts,
            'categories' => $categories,
            'aiTools' => $aiTools,
            'filters' => [
                'category' => $selectedCategory,
                'tool' => $selectedTool,
                'search' => $search,
            ],
        ]);
    }

    /**
     * Redirect to affiliate URL and increment clicks count.
     */
    public function redirectAffiliate(string $slug): RedirectResponse
    {
        $prompt = Prompt::with('aiTool')
            ->where('slug', $slug)
            ->firstOrFail();

        $prompt->increment('clicks_count');

        // Priority: custom affiliate URL on prompt, fallback to tool affiliate URL
        $targetUrl = $prompt->custom_affiliate_url ?: $prompt->aiTool?->affiliate_url;

        if (!$targetUrl) {
            return redirect()->route('home');
        }

        return redirect()->away($targetUrl, 302);
    }

    /**
     * Track copy prompt action (lightweight API endpoint).
     */
    public function trackCopy(int $id): JsonResponse
    {
        $prompt = Prompt::find($id);

        if ($prompt) {
            $prompt->increment('copies_count');

            return response()->json([
                'success' => true,
                'copies_count' => $prompt->copies_count,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Prompt not found.',
        ], 404);
    }
}
