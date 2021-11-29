<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Campañas;

class CampañasController extends Controller
{
    public function index()
    {
        $campaña = DB::table('campañas')->get();
        return $campaña;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nombre_campaña'=> 'required|max:255',
            'fecha_termino'=> 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        $campaña = Campañas::create([
            'nombre_campaña'=>$request->nombre_campaña,
            'fecha_termino'=>$request->fecha_termino
        ]);
        $campaña = DB::table('campañas')->get();
        return $campaña;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nombre_campaña'=> 'required|max:255',
            'fecha_termino'=> 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        Campañas::where('id',$request->id)
        ->update(['nombre_campaña'=>$request->nombre_campaña,'fecha_termino'=>$request->fecha_termino]);
        $campaña = DB::table('campañas')->get();
        return $campaña;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Campañas::where('id', $request->id)->delete();
        $campaña = DB::table('campañas')->get();
        return $campaña;
    }
}
