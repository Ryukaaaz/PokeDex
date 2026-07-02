<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
