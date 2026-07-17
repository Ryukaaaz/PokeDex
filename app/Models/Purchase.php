<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Purchase extends Model
{
    //
    protected $fillable = [
        'purchase_date',
        'notes',
        'created_by',
    ];

    /**
     * Summary of purchase_items
     * @return HasMany<Purchase_item, $this>
     */
    public function purchase_items(): HasMany
    {
        return $this->hasMany(Purchase_item::class);
    }

    /**
     * Summary of user
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
