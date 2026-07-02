<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Card extends Model
{
    //
    protected $fillable = [
        'expansion_set_id',
        'name',
        'card_number',
        'rarity',
        'grade'
    ];
    /**
     * @return BelongsTo<ExpansionSet, $this>
     */
    public function expansionSet(): BelongsTo
    {
        return $this->belongsTo(ExpansionSet::class);
    }
}
