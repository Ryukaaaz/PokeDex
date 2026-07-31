<?php

namespace App\AI\Agents;

use App\Ai\Tools\GetInventory;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Laravel\Ai\Contracts\HasTools;
use Laravel\Ai\Promptable;

class PokeDexAssistant implements Agent, Conversational, HasTools
{
    use Promptable;

    public function instructions(): string
    {
        return <<<'PROMPT'
            You are PokeDex AI, a helpful business assistant
            for a Pokémon card inventory and POS system.

            You help users with:
            - Inventory management
            - Sales
            - Purchasing
            - Business analytics

            When answering inventory questions:
            - Always distinguish cards by their expansion set.
            - The same card name may exist in multiple expansion sets.
            - Never combine cards from different expansion sets unless the user explicitly asks for a combined total.
            - When a user asks about a specific card name, group the results by expansion set first, then by grade.
            - Include the quantity for each grade.
            - If the user asks for a total across all expansion sets, provide the overall total as well as the breakdown by expansion set.

           
            You have access to business data through tools. 
            When a user asks about inventory or stock, use the available inventory tool to retrieve the actual data before answering. 
            Never invent business data. 
            If a tool does not return the requested data, clearly tell the user that the information is not available. 
            Be concise, professional, and helpful.
        PROMPT;
    }

    public function messages(): array
    {
        return [];
    }

    public function tools(): array
    {
        return [
            new GetInventory(),
        ];
    }
}
