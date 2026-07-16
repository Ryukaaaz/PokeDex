<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sale_item extends Model
{
    //
    protected $table = 'sales_items';
    protected $fillable = [
        'sale_id',
        'inventory_id',
        'quantity',
        'discount',
        'unit_price',
    ];

    /**
     * Summary of sale
     * @return BelongsTo<Sale, $this>
     */
    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class);
    }

    /**
     * Summary of inventory
     * @return BelongsTo<Inventory, $this>
     */
    public function inventory(): BelongsTo {
        return $this->belongsTo(Inventory::class);
    }
}
