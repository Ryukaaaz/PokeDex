<?php

namespace App\Http\Controllers;

use App\AI\Agents\PokeDexAssistant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class AIAssistantController extends Controller
{

    public function ask(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string'],
        ]);

        try {
            $agent = new PokeDexAssistant();

            $response = $agent->prompt(
                $validated['message']
            );

            return response()->json([
                'message' => $response->text,
            ]);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'PokeDex AI is currently unavailable because the AI service has no available credits.',
            ], 503);
        }
    }
}
