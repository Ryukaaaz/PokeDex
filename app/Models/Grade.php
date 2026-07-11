<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Grade extends Model
{
    //
    protected $fillable = [
        'name'
    ];

    /**
     * @return HasMany<Card, $this>
     */
    public function cards(): HasMany
    {
        return $this->hasMany(Card::class);
    }

    /**
     * @return HasMany<Inventory, $this>
     */

    public function inventories(): HasMany{
        return $this->hasMany(Inventory::class);
    }
}
