<?php

namespace App\Ai\Tools;

use App\Models\Inventory;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;
use Stringable;

class GetInventory implements Tool
{
    /**
     * Get the description of the tool's purpose.
     */
    public function description(): Stringable|string
    {
        return 'A description of the tool.';
    }

    /**
     * Execute the tool.
     */
    public function handle(Request $request): Stringable|string
    {
        $value = $request['value'];
        $inventory = Inventory::query()
            ->with([
                'card.expansionSet',
                'grade'
            ])->get();
        $totalQuantity = $inventory->sum('quantity');
        $totalItems = $inventory->count();
        return json_encode([
            'query' => $value,
            'total_inventory_records' => $totalItems,
            'total_quantity' => $totalQuantity,
            'inventory' =>
            $inventory->map(function ($item) {
                return [
                    'card_name' => $item->card->name ?? 'Unknown',
                    'expansion_set' => $item->card->expansionSet->name ?? 'Unknown',
                    'grade' => $item->grade->name ?? 'Unknown',
                    'quantity' => $item->quantity,
                ];
            })->values()->toArray(),
        ]);
    }

    /**
     * Get the tool's schema definition.
     */
    public function schema(JsonSchema $schema): array
    {
        return ['value' => $schema->string()->description('The inventory or stock information the user is asking about.')->required(),];
    }
}
