<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePromptRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:prompts,slug'],
            'prompt_text' => ['required', 'string'],
            'negative_prompt' => ['nullable', 'string'],
            'model_version' => ['nullable', 'string', 'max:255'],
            'aspect_ratio' => ['nullable', 'string', 'max:50'],
            'preview_video_url' => ['required', 'string', 'url'],
            'preview_thumbnail_url' => ['nullable', 'string', 'url'],
            'custom_affiliate_url' => ['nullable', 'string', 'url'],
            'ai_tool_id' => ['nullable', 'exists:ai_tools,id'],
            'ai_tool_slug' => ['nullable', 'exists:ai_tools,slug'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'category_slug' => ['nullable', 'exists:categories,slug'],
            'is_published' => ['nullable', 'boolean'],
        ];
    }
}
