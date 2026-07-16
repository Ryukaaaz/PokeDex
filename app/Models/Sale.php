<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sale extends Model
{
    //
    protected $fillable = [
        'sale_date',
        'notes',
    ];

    /**
     * Summary of sale_item
     * @return HasMany<Sale_item, $this>
     */
    public function sale_item(): HasMany
    {
        return $this->hasMany(Sale_item::class);
    }
}
