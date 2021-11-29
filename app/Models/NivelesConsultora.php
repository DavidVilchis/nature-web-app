<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NivelesConsultora extends Model
{
    use HasFactory;
    protected $table = 'niveles_consultora';
    protected $fillable =[
        'id',
        'nombre_nivel_consultora'
    ];
}
