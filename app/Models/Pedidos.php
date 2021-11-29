<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedidos extends Model
{
    use HasFactory;
    protected $table = 'pedidos';
    protected $fillable =[
        'consultora_id',
        'producto_id',
        'cantidad',
        'total_consultora',
        'total_venta',
    ];
}
