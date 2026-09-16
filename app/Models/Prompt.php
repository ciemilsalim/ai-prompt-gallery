<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prompt extends Model
{
    protected $fillable = [
        'ai_tool_id',
        'category_id',
        'title',
        'slug',
        'prompt_text',
        'negative_prompt',
        'model_version',
        'aspect_ratio',
        'preview_video_url',
        'preview_thumbnail_url',
        'custom_affiliate_url',
        'views_count',
        'copies_count',
        'clicks_count',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'views_count' => 'integer',
        'copies_count' => 'integer',
        'clicks_count' => 'integer',
    ];

    public function aiTool()
    {
        return $this->belongsTo(AiTool::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
