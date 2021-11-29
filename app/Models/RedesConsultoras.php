<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RedesConsultoras extends Model
{
    use HasFactory;
    protected $table = 'redes_consultoras';
    protected $fillable =[
        'id',
        'nombre_red',
        'estado'
    ];
}
