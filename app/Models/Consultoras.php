<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultoras extends Model
{
    use HasFactory;
    protected $table = 'consultoras';
    protected $fillable =[
        'nombre_consultora',
        'apellido_paterno_consultora',
        'apellido_materno_consultora',
        'email',
        'estado',
        'telefono',
        'domicilio',
        'redes_consultora_id',
        'consultora_red',
        'nivel_consultora_id'
    ];
}
