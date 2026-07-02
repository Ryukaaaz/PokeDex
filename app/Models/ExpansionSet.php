<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Card;

class ExpansionSet extends Model
{
    //
    protected $fillable = [
        'code',
        'name',
        'series',
        'language',
        'release_date',
        'printed_total',
        'total'
    ];

    public function cards(): HasMany{
        return $this->hasMany(Card::class);
    }
}
