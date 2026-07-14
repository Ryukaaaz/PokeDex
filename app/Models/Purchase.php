<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Purchase extends Model
{
    //
    protected $fillable = [
        'purchase_date','notes'
    ];

    /**
     * Summary of purchase_items
     * @return HasMany<Purchase_item, $this>
     */
    public function purchase_items(): HasMany
    {
        return $this->hasMany(Purchase_item::class);
    }
}
