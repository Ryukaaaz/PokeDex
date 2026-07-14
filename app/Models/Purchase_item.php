<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Purchase_item extends Model
{
    //
    protected $fillable = [
        'purchase_id',
        'card_id',
        'grade_id',
        'quantity',
        'unit_cost',
    ];

    /**
     * Summary of purchase
     * @return BelongsTo<Purchase,$this>
     */
    public function purchase ():BelongsTo
    {
        return $this->belongsTo(Purchase::class);
    }
    
    /**
     * Summary of card
     * @return BelongsTo<Card, $this>
     */
    public function card (): BelongsTo
    {
        return $this->belongsTo(Card::class);
    }

    /**
     * Summary of grade
     * @return BelongsTo<Grade, $this>
     */
    public function grade(): BelongsTo
    {
        return $this->belongsTo(Grade::class);
    }
}
