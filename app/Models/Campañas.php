<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campañas extends Model
{
    use HasFactory;
    protected $fillable =[
        'id',
        'nombre_campaña',
        'fecha_termino'
    ];
    public function productos(){
        return $this->hasMany(Productos::class);
    }
}
