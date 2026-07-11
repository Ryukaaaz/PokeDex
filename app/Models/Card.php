<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Card extends Model
{
    //
    protected $fillable = [
        'expansion_set_id',
        'name',
        'card_number',
        'rarity_id',
        'grade_id',
        'image',
    ];
    /**
     * @return BelongsTo<ExpansionSet, $this>
     */
    public function expansionSet(): BelongsTo
    {
        return $this->belongsTo(ExpansionSet::class);
    }

    /**
     * @return BelongsTo<Rarity, $this>
     */
    public function rarity(): BelongsTo
    {
        return $this->belongsTo(Rarity::class);
    }

    /**
     * @return BelongsTo<Grade, $this>
     */
    public function grade(): BelongsTo
    {
        return $this->belongsTo(Grade::class);
    }

    /**
     * @return HasMany<Inventory, $this>
     */
    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }
}
